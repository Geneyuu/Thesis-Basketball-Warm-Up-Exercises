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
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { exercises } from "../../../exercisespaths/exercises";

// ExerciseItem Component
const ExerciseItem = ({ id, name, image }) => {
	const router = useRouter();
	const [isClickable, setIsClickable] = useState(true);

	// Handle button press and disable temporarily
	const handlePress = () => {
		if (!isClickable) return;
		setIsClickable(false);
		router.push(`/home/stretching/${id}`);

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
			router.push("/home/stretching/StartWarmUps");
			setTimeout(() => setIsClickable(true), 1300);
		}
	};

	return (
		<View style={styles.stickyButtonContainer}>
			<TouchableOpacity style={styles.stickyButton} onPress={handlePress}>
				<Text style={styles.stickyButtonText}>Start Warmups</Text>
			</TouchableOpacity>
		</View>
	);
};

// WithBall Component (Main Component)
const Stretching = () => (
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
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Maecenas et consectetur ante. Vivamus vulputate nibh eros, vel
				tempor magna posuere sed.
			</Text>
			<Text style={styles.subheading}>Included exercises:</Text>
			<View style={styles.exerciseContainer}>
				{exercises.slice(12).map((exercise) => (
					<ExerciseItem key={exercise.id} {...exercise} />
				))}
			</View>
		</ScrollView>
		<StickyButton />
	</>
);

// Styles
const styles = StyleSheet.create({
	container: {
		padding: wp(4),
		backgroundColor: "#fff",
	},

	mainImage: {
		width: "100%",
		height: hp(30),
		resizeMode: "cover",
		borderRadius: wp(3),
		marginBottom: hp(2.5),
	},

	description: {
		fontSize: wp(4),
		lineHeight: hp(3),
		color: "#161616",
		marginBottom: hp(2),
		textAlign: "justify",
		fontFamily: "Karla-Regular",
	},

	subheading: {
		fontSize: wp(5),
		marginBottom: hp(2.5),
		color: "#161616",
		fontFamily: "Karla-Bold",
	},

	exerciseContainer: {
		flexDirection: "column",
		marginBottom: hp(8),
	},

	// Exercise Item Styles
	exercise: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: wp(2),
		padding: wp(3),
		marginBottom: hp(1.5),
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: wp(1), height: hp(1) },
	},

	exerciseImage: {
		width: wp(20),
		height: wp(20),
		borderRadius: wp(2),
		marginRight: wp(3),
	},

	exerciseText: {
		fontSize: wp(4),
		color: "#161616",
		fontFamily: "Roboto-ExtraBold",
		flexShrink: 1,
	},

	// Sticky Button Styles
	stickyButtonContainer: {
		position: "absolute",
		bottom: hp(2),
		left: wp(4),
		right: wp(4),
	},

	stickyButton: {
		backgroundColor: "#161616",
		paddingVertical: hp(1.5),
		borderWidth: 2,
		borderRadius: wp(2),
		justifyContent: "center",
		alignItems: "center",
	},

	stickyButtonText: {
		fontSize: wp(4.5),
		color: "#fff",
		fontFamily: "Karla-Bold",
	},
});

export default Stretching;
