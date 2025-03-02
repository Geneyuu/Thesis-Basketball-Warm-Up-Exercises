import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Video } from "expo-av";

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

const ExerciseDetails = () => {
	const { id } = useLocalSearchParams(); // Retrieve the exercise ID
	console.log(`This is ${id}`);

	const videoSource = videoSources[id];
	const [isVideoReady, setIsVideoReady] = useState(false); // Track video load status

	if (!videoSource) {
		console.log("Video not found for id:", id);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Exercise Details</Text>
			<Text style={styles.description}>You selected: {id}</Text>

			{/* Render the video player only after it's loaded */}
			{/* Render the video player only after it's loaded */}
			{videoSource ? (
				<>
					{!isVideoReady && (
						<Text style={styles.loadingText}>Loading video...</Text>
					)}

					<Video
						source={videoSource}
						style={styles.video}
						useNativeControls={false}
						shouldPlay={true}
						isLooping={true}
						resizeMode="contain"
						onLoad={() => setIsVideoReady(true)} // Set the video as ready once loaded
					/>
				</>
			) : (
				<Text style={styles.errorText}>Video not found</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	description: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	video: {
		width: "100%",
		height: 250,
		marginTop: 20,
	},
	errorText: {
		color: "red",
		fontSize: 16,
		marginTop: 20,
	},
	loadingText: {
		fontSize: 16,
		color: "gray",
		marginTop: 20,
	},
});

export default ExerciseDetails;
