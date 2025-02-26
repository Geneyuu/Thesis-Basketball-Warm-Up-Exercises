import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, Text, StyleSheet, AppState } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Video } from "expo-av";
import { exercises } from "../../../exercisespaths/exercises"; // Import your exercise data
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

const ExerciseDetails = () => {
	const { id } = useLocalSearchParams(); // Retrieve the exercise ID
	console.log(`This is ${id}`);

	const exercise = exercises.find((exercise) => exercise.id === id); // Find the exercise by ID

	if (!exercise) {
		return <Text>Exercise not found</Text>; // Show error if no exercise is found
	}

	const { video, name, performDescription } = exercise;

	const videoRef = useRef(null);
	const [isVideoReady, setIsVideoReady] = useState(false); // Track video load status
	const [isPlaying, setIsPlaying] = useState(false); // Track video playing state

	useFocusEffect(
		useCallback(() => {
			// Auto-play video when screen is focused
			if (videoRef.current) {
				videoRef.current.playAsync();
			}
			setIsPlaying(true);

			// Handle AppState changes
			const handleAppStateChange = (appStatus) => {
				if (appStatus === "active" && isVideoReady) {
					setIsPlaying(true);
					videoRef.current?.playAsync();
				} else {
					setIsPlaying(false);
					videoRef.current?.pauseAsync();
				}
			};

			// Subscribe to AppState changes
			const appStateListener = AppState.addEventListener(
				"change",
				handleAppStateChange
			);

			// Cleanup function when screen loses focus
			return () => {
				appStateListener.remove();
				setIsPlaying(false);
				videoRef.current?.pauseAsync();
			};
		}, [isVideoReady]) // Dependency on video readiness
	);

	return (
		<View style={styles.container}>
			{video ? (
				<>
					{!isVideoReady && (
						<Text style={styles.loadingText}>Loading video...</Text>
					)}

					<View style={styles.videoContainer}>
						<Video
							ref={videoRef}
							source={video}
							style={[
								styles.video,
								!isVideoReady && { opacity: 0 },
							]} // Hide until loaded
							useNativeControls={false} // Disable video controls
							shouldPlay={isPlaying} // Auto-play if focused
							isLooping
							resizeMode="cover"
							onLoad={() => setIsVideoReady(true)} // Mark video as ready once loaded
							onError={(error) =>
								console.log("Error loading video:", error)
							}
						/>
					</View>
				</>
			) : (
				<Text style={styles.errorText}>Video not available</Text>
			)}

			{/* Exercise name and description below the video */}
			<Text style={styles.title}>{name}</Text>
			<View style={styles.detailsContainer}>
				<Text style={styles.detailTitle}>Description</Text>
				<Text style={styles.detailText}>{performDescription}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
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
	videoContainer: {
		width: "100%",
		overflow: "hidden",
		alignSelf: "center",
		height: 250,
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
	errorText: {
		color: "red",
		fontSize: 16,
		marginTop: 20,
	},
});

export default ExerciseDetails;
