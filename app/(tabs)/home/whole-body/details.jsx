import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { exercises } from "../../../exercisespaths/exercises";
// ExerciseItem Component
const ExerciseItem = ({ id, name, image }) => {
	const router = useRouter();
	const [isClickable, setIsClickable] = useState(true);

	// Handle button press and disable temporarily
	const handlePress = () => {
		if (!isClickable) return;
		setIsClickable(false);
		router.push(`/home/whole-body/${id}`);

		const timeout = setTimeout(() => setIsClickable(true), 1300);
		return () => clearTimeout(timeout); // Cleanup
	};

	return (
		<TouchableOpacity onPress={handlePress} disabled={!isClickable}>
			<View style={styles.exercise}>
				<Image source={image} style={styles.exerciseImage} />
				<Text style={styles.exerciseText}>{name}</Text>
			</View>
		</TouchableOpacity>
	);
};

// StickyButton Component
const StickyButton = () => {
	const router = useRouter();
	const [isClickable, setIsClickable] = useState(true);

	const handlePress = () => {
		if (isClickable) {
			setIsClickable(false);
			router.push("/home/whole-body/StartWarmUps");
			setTimeout(() => setIsClickable(true), 1300);
		}
	};

	// const handleStartWarmUp = () => {
	// 	router.push("../../home/with-ball/StartWarmUps");
	// };

	return (
		<View style={styles.stickyButtonContainer}>
			<TouchableOpacity style={styles.stickyButton} onPress={handlePress}>
				<Text style={styles.stickyButtonText}>Start Warmups</Text>
			</TouchableOpacity>
		</View>
	);
};

// WithBall Component (Main Component)
const WithBall = () => (
	<>
		<ScrollView
			contentContainerStyle={styles.container}
			showsVerticalScrollIndicator={false}
		>
			<Image
				source={require("../../../../assets/images/withballpreview.png")}
				style={styles.mainImage}
			/>
			<Text style={styles.description}>
				Whole Body Exercises are warm-up activities that engage multiple
				muscle groups simultaneously. These exercises aim to increase
				heart rate, enhance blood circulation, and prepare the entire
				body for physical activity.{"\n\n"}
				They improve mobility, coordination, and overall readiness,
				helping to prevent injuries and boost athletic performance in
				basketball.
			</Text>

			<Text style={styles.subheading}>Included exercises:</Text>
			<View style={styles.exerciseContainer}>
				{exercises.map((exercise) => (
					<ExerciseItem key={exercise.id} {...exercise} />
				))}
			</View>
		</ScrollView>
		<StickyButton />
	</>
);

// Styles
const styles = StyleSheet.create({
	container: { padding: 16, backgroundColor: "#fff" },
	mainImage: {
		width: "100%",
		height: 250,
		resizeMode: "cover",
		borderRadius: 12,
		marginBottom: 20,
	},
	description: {
		fontSize: 13,
		lineHeight: 22,
		color: "#161616",
		marginBottom: 16,
		textAlign: "justify",
		fontFamily: "Karla-Regular",
	},
	subheading: {
		fontSize: 22,
		marginBottom: 20,
		color: "#161616",
		fontFamily: "Karla-Bold",
	},
	exerciseContainer: { flexDirection: "column", marginBottom: 50 },

	// Exercise Item Styles
	exercise: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	exerciseImage: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
	exerciseText: {
		fontSize: 15,
		color: "#161616",
		fontFamily: "Roboto-ExtraBold",
		flexShrink: 1,
	},

	// Sticky Button Styles
	stickyButtonContainer: {
		position: "absolute",
		bottom: 18,
		left: 16,
		right: 16,
	},
	stickyButton: {
		backgroundColor: "#161616",
		paddingVertical: 12,
		borderWidth: 2,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	stickyButtonText: { fontSize: 18, color: "#fff", fontFamily: "Karla-Bold" },
});

export default WithBall;
