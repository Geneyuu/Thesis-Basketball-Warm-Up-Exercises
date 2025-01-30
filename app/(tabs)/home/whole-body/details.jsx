import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { router, useRouter } from "expo-router";

// Exercises data
const wholeBodyExercises = [
	{
		id: "exercise-1",
		name: "Arm Stretch (Left Arm)",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/video.mp4"),
	},
	{
		id: "exercise-2",
		name: "Arm Stretch (Right Arm)",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "exercise-3",
		name: "Arm Circles",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "exercise-4",
		name: "Shoulder Rolls",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "exercise-5",
		name: "Neck Tilts",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "exercise-6",
		name: "Leg Stretch (Left Leg)",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "exercise-7",
		name: "Leg Stretch (Right Leg)",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "exercise-8",
		name: "Toe Touches",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "exercise-9",
		name: "Side Stretches",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "exercise-10",
		name: "Lunges",
		image: require("../../../../assets/images/default-logo.webp"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
];

// ExerciseItem Component with Disabled State for Clicks
const ExerciseItem = ({ id, name, image }) => {
	const router = useRouter();
	const [isClickable, setIsClickable] = useState(true);

	// Handle button press and disable temporarily
	const handlePress = () => {
		if (isClickable) {
			setIsClickable(false);

			// Navigate to the specific exercise page
			router.push(`/home/whole-body/${id}`);

			// Re-enable the button after 1.3 seconds
			setTimeout(() => {
				setIsClickable(true);
			}, 1300); // 1.3 seconds
		}
	};

	const styles = StyleSheet.create({
		exercise: {
			flexDirection: "row",
			alignItems: "center",
			backgroundColor: "#fff",
			shadowOffset: { width: 10, height: 3 },
			borderRadius: 0,
			padding: 12,
			marginBottom: 12,
			shadowOpacity: 0.2,
			shadowRadius: 5,
			borderWidth: 1,
			borderRadius: 8,
		},
		exerciseImage: {
			width: 80,
			height: 80,
			borderRadius: 8,
			marginRight: 12,
		},
		exerciseText: {
			fontSize: 19,
			color: "#161616",
			fontFamily: "Karla-Regular",
			flexShrink: 1,
			flexWrap: "wrap",
		},
	});

	return (
		<TouchableOpacity onPress={handlePress} disabled={!isClickable}>
			<View style={styles.exercise}>
				<Image source={image} style={styles.exerciseImage} />
				<Text style={styles.exerciseText}>{name}</Text>
			</View>
		</TouchableOpacity>
	);
};

// StickyButton Component (Unchanged)
const StickyButton = () => {
	const styles = StyleSheet.create({
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
			elevation: 0,
			borderRadius: 8,
			justifyContent: "center",
			alignItems: "center",
		},
		stickyButtonText: {
			fontSize: 18,
			color: "#fff",
			fontFamily: "Karla-Bold",
		},
	});

	const handleStartWarmUpHandlePress = () => {
		router.push("../../home/whole-body/StartWarmUps");
	};

	return (
		<View style={styles.stickyButtonContainer}>
			<TouchableOpacity
				style={styles.stickyButton}
				activeOpacity={0.7}
				onPress={handleStartWarmUpHandlePress}
			>
				<Text style={styles.stickyButtonText}>Start Warmups</Text>
			</TouchableOpacity>
		</View>
	);
};

// WholeBody Component (Main Component)
const WholeBody = () => {
	const styles = StyleSheet.create({
		container: {
			padding: 16,
			backgroundColor: "#fff",
		},
		mainImage: {
			width: "100%",
			height: 250,
			resizeMode: "cover",
			borderRadius: 12,
			marginBottom: 20,
		},
		description: {
			fontSize: 16,
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
		exerciseContainer: {
			flexDirection: "column",
			marginBottom: 50,
		},
	});

	return (
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
					Maecenas et consectetur ante. Vivamus vulputate nibh eros,
					vel tempor magna posuere sed. Sed fermentum tortor tellus,
					tempor malesuada nibh fringilla non.
				</Text>
				<Text style={styles.subheading}>Included exercises:</Text>
				<View style={styles.exerciseContainer}>
					{wholeBodyExercises.map((exercise) => (
						<ExerciseItem
							key={exercise.id}
							id={exercise.id}
							name={exercise.name}
							image={exercise.image}
						/>
					))}
				</View>
			</ScrollView>
			<StickyButton />
		</>
	);
};

export default WholeBody;
