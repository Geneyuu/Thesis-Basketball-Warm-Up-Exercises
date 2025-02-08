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

// Exercises data
const exercises = [
	{
		id: "arm-stretch-left-arm",
		name: "Arm Stretch (Left Arm)",
		image: require("../../../../assets/images/stretchingpreview.png"),
		video: require("../../../../assets/videos/video.mp4"),
	},
	{
		id: "arm-stretch-right-arm",
		name: "Arm Stretch (Right Arm)",
		image: require("../../../../assets/images/wholebodypreview.png"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "arm-circles",
		name: "Arm Circles",
		image: require("../../../../assets/images/withballpreview.png"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "shoulder-rolls",
		name: "Shoulder Rolls",
		image: require("../../../../assets/images/stretchingpreview.png"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "neck-tilts",
		name: "Neck Tilts",
		image: require("../../../../assets/images/stretchingpreview.png"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "leg-stretch-left-leg",
		name: "Leg Stretch (Left Leg)",
		image: require("../../../../assets/images/stretchingpreview.png"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "leg-stretch-right-leg",
		name: "Leg Stretch (Right Leg)",
		image: require("../../../../assets/images/stretchingpreview.png"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "toe-touches",
		name: "Toe Touches",
		image: require("../../../../assets/images/stretchingpreview.png"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "side-stretches",
		name: "Side Stretches",
		image: require("../../../../assets/images/stretchingpreview.png"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
	{
		id: "lunges",
		name: "Lunges",
		image: require("../../../../assets/images/stretchingpreview.png"),
		video: require("../../../../assets/videos/pushup.mp4"),
	},
];

// ExerciseItem Component
const ExerciseItem = ({ id, name, image }) => {
	const router = useRouter();
	const [isClickable, setIsClickable] = useState(true);

	// Handle button press and disable temporarily
	const handlePress = () => {
		if (isClickable) {
			setIsClickable(false);
			router.push(`/home/with-ball/${id}`);
			setTimeout(() => setIsClickable(true), 1300); // Re-enable after 1.3 seconds
		}
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
			router.push("../../home/with-ball/StartWarmUps");
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
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Maecenas et consectetur ante. Vivamus vulputate nibh eros, vel
				tempor magna posuere sed.
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
		borderWidth: 1,
	},
	exerciseImage: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
	exerciseText: {
		fontSize: 19,
		color: "#161616",
		fontFamily: "Karla-Regular",
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
