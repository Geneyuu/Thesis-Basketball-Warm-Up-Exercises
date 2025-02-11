import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";

const exerciseTitles = {
	"arm-stretch-left-arm": "Arm Stretch (Left)",
	"arm-stretch-right-arm": "Arm Stretch (Right)",
	"arm-circles": "Arm Circles",
	"shoulder-rolls": "Shoulder Rolls",
	"neck-tilts": "Neck Tilts",
	"leg-stretch-left-leg": "Leg Stretch (Left)",
	"leg-stretch-right-leg": "Leg Stretch (Right)",
	"toe-touches": "Toe Touches",
	"side-stretches": "Side Stretches",
	lunges: "Lunges",
};

const videoSources = {
	"arm-stretch-left-arm": require("../../../../assets/videos/video.mp4"),
	"arm-stretch-right-arm": require("../../../../assets/videos/pushup.mp4"),
	"arm-circles": require("../../../../assets/videos/pushup.mp4"),
	"shoulder-rolls": require("../../../../assets/videos/pushup.mp4"),
	"neck-tilts": require("../../../../assets/videos/pushup.mp4"),
	"leg-stretch-left-leg": require("../../../../assets/videos/pushup.mp4"),
	"leg-stretch-right-leg": require("../../../../assets/videos/pushup.mp4"),
	"toe-touches": require("../../../../assets/videos/pushup.mp4"),
	"side-stretches": require("../../../../assets/videos/pushup.mp4"),
	lunges: require("../../../../assets/videos/pushup.mp4"),
};

const exerciseInstructions = {
	"arm-stretch-left-arm":
		"Extend your left arm straight across your chest and use your right hand to gently pull it towards you. Hold for 15-30 seconds.",
	"arm-stretch-right-arm":
		"Extend your right arm straight across your chest and use your left hand to gently pull it towards you. Hold for 15-30 seconds.",
	"arm-circles":
		"Extend your arms to the sides and make small circular motions. Gradually increase the circle size and repeat for 30 seconds.",
	"shoulder-rolls":
		"Lift your shoulders towards your ears, then roll them back and down in a circular motion. Repeat 10 times, then reverse.",
	"neck-tilts":
		"Slowly tilt your head towards one shoulder and hold for a few seconds. Repeat on the other side.",
	"leg-stretch-left-leg":
		"Step your left foot forward and keep your back leg straight while bending the front knee slightly. Hold for 15-30 seconds.",
	"leg-stretch-right-leg":
		"Step your right foot forward and keep your back leg straight while bending the front knee slightly. Hold for 15-30 seconds.",
	"toe-touches":
		"Stand straight and bend forward at the waist, reaching for your toes. Hold for 15-30 seconds.",
	"side-stretches":
		"Raise one arm overhead and lean to the opposite side. Hold for a few seconds, then switch sides.",
	lunges: "Step forward with one leg and lower your hips until both knees are bent at 90 degrees. Repeat on the other leg.",
};

const ExerciseDetails = () => {
	const { id } = useLocalSearchParams();
	const [showPlayer, setShowPlayer] = useState(false);

	const exerciseTitle = exerciseTitles[id] || "Exercise Details";
	const videoSource = videoSources[id];
	const instructionText =
		exerciseInstructions[id] ||
		"No specific instructions available for this exercise.";

	const player = useVideoPlayer(videoSource, (player) => {
		player.loop = true;
		player.muted = true;
	});

	useFocusEffect(
		React.useCallback(() => {
			const timeout = setTimeout(() => {
				setShowPlayer(true);
				if (player) {
					player.play();
				}
			}, 400);

			return () => {
				clearTimeout(timeout);
				setShowPlayer(false);
			};
		}, [player])
	);

	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		player.play();
	// 	}, 500);

	// 	return () => {
	// 		clearTimeout(timeout);
	// 	};
	// }, []); di ko muna ginamit to since mas okay yung usefocuseffect

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ flexGrow: 1 }}
		>
			<View style={styles.videoContainer}>
				{showPlayer && videoSource ? (
					<VideoView
						style={styles.video}
						player={player}
						nativeControls={false}
					/>
				) : (
					<Text style={styles.loadingText}>Loading video...</Text>
				)}
			</View>

			<Text style={styles.title}>{exerciseTitle}</Text>

			<View style={styles.detailsContainer}>
				<Text style={styles.detailTitle}>Instructions:</Text>
				<Text style={styles.detailText}>{instructionText}</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	videoContainer: {
		width: "100%",
		overflow: "hidden",
		height: "250",
		justifyContent: "center",
		alignItems: "center",
	},
	video: {
		width: "100%",
		height: "100%",
		resizeMode: "stretch",
	},
	loadingText: {
		color: "#666",
		fontSize: 16,
		textAlign: "center",
	},
	title: {
		fontSize: 35,
		color: "#333",
		marginBottom: 20,
		textAlign: "center",
		fontFamily: "Karla-Bold",
		marginTop: 30,
	},
	detailsContainer: {
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 15,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 2,
		marginTop: 20,
		width: "90%", // Adjust width to make it narrower
		maxWidth: "auto", // Prevent it from being too wide
		alignSelf: "center", // Center it
	},

	detailTitle: {
		fontSize: 22,
		color: "#333",
		marginBottom: 10,
		fontFamily: "Karla-Bold",
	},
	detailText: {
		fontSize: 16,
		color: "#666",
		lineHeight: 24,
		fontFamily: "Karla-Regular",
		textAlign: "left",
	},
});

export default ExerciseDetails;
