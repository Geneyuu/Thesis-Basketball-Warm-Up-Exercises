import React, { useEffect, useContext, useState, useRef } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet,
	AppState,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Data } from "../../../_layout"; // Adjust the path as needed
import { exercises } from "../../../exercisespaths/withballExercises"; // Exercises Data
import { Video } from "expo-av"; // Import Video component from expo-av
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StartWarmups = () => {
	// Extracting values from context
	const {
		currentExerciseIndex,
		setCurrentExerciseIndex,
		timer,
		setTimer,
		isTimerRunning,
		setIsTimerRunning,
		isResting,
		setIsResting,
		exerciseTimer, // Timer duration for exercise
		restTimer, // Timer duration for rest period
	} = useContext(Data);

	// Get current and next exercise
	const currentExercise = exercises[currentExerciseIndex];
	const nextExercise = exercises[currentExerciseIndex + 1];

	const [restartVideo, setRestartVideo] = useState(false);

	// Functions for controlling the warmup flow
	const startWarmup = () => setIsTimerRunning(true);
	const stopWarmup = () => setIsTimerRunning(false);
	const restartWarmup = () => {
		setRestartVideo(true);
		setTimeout(() => {
			setRestartVideo(false);
		}, 150);
		setCurrentExerciseIndex(0);
		setIsResting(false);
		setIsTimerRunning(false);
		setTimer(exerciseTimer);
	};

	const resetTimerAndVideo = () => {
		setTimer(exerciseTimer);
		setIsTimerRunning(false);
		setRestartVideo(true);
		setTimeout(() => {
			setRestartVideo(false);
		}, 500);
	};

	useEffect(() => {
		setCurrentExerciseIndex(0);
		setIsTimerRunning(false);
		setTimer(exerciseTimer);
		setIsResting(false);
	}, []); // This will only run once on mount

	useFocusEffect(
		React.useCallback(() => {
			// Handle app state changes (foreground vs background)
			const handleAppStateChange = (appStatus) => {
				if (appStatus === "active") {
					// App comes to the foreground, continue the timer
					setIsTimerRunning(false);
				} else {
					// App goes to background, stop the timer
					stopWarmup();
				}
			};

			// Subscribe to app state changes
			const appStateSubscription = AppState.addEventListener(
				"change",
				handleAppStateChange
			);

			setIsTimerRunning(isResting || isTimerRunning);
			// if (isResting) {
			// 	setIsTimerRunning(true);
			// } else if (!isResting && !isTimerRunning) {
			// 	setIsTimerRunning(false);
			// } else if (!isResting && isTimerRunning) {
			// 	setIsTimerRunning(true);
			// }

			// Cleanup function
			return () => {
				appStateSubscription.remove();
				stopWarmup();
				setIsTimerRunning(false);

				setRestartVideo(true);
				setTimeout(() => {
					setRestartVideo(false);
				}, 100);
			};
		}, [isResting, isTimerRunning]) // ✅ No need to track isResting
	);

	// Timer logic and exercise progression
	useEffect(() => {
		let interval;

		// Countdown logic for exercise
		if (isTimerRunning && timer > 0) {
			interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
		}

		// Handle exercise transition when the timer hits 0
		else if (timer === 0 && !isResting) {
			if (currentExerciseIndex < exercises.length - 1) {
				setIsResting(true);
				setTimer(restTimer); // Set the rest period timer
			} else {
				setIsTimerRunning(false);
				setCurrentExerciseIndex(0);
				setTimer(exerciseTimer); // Reset to exercise timer
				setIsResting(false);
				router.replace("/(tabs)/");
				setTimeout(() => {
					alert(
						"With Ball Exercises Completed! You can now play Basketball!"
					);
				}, 100);
			}
		}
		// Handle rest period transition when the timer hits 0
		else if (timer === 0 && isResting) {
			if (currentExerciseIndex < exercises.length - 1) {
				setCurrentExerciseIndex((prev) => prev + 1);
				setIsResting(false);
				setTimer(exerciseTimer); // Switch to next exercise
			}
		}

		return () => clearInterval(interval);
	}, [isTimerRunning, timer, currentExerciseIndex, isResting]);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.exerciseContainer}>
				<Text style={styles.heading}>
					{isResting ? "Rest" : currentExercise.name}
				</Text>

				{/* Render ExerciseImage or ExerciseVideo */}
				{isResting ? (
					<>
						<ExerciseImage
							nextExercise={nextExercise}
							currentExercise={currentExercise}
						/>
						<Text style={styles.heading}>
							Next Warm Up: {nextExercise?.name}
						</Text>
					</>
				) : (
					<ExerciseVideo
						videoSource={currentExercise.video}
						isTimerRunning={isTimerRunning}
						restartVideo={restartVideo} // Pass the restart flag here
					/>
				)}

				{/* Render Description and Timer Controls */}
				{!isResting && (
					<ExerciseDescription currentExercise={currentExercise} />
				)}
				<TimerControls
					timer={timer}
					isResting={isResting}
					isTimerRunning={isTimerRunning}
					startWarmup={startWarmup}
					stopWarmup={stopWarmup}
					restartWarmup={restartWarmup}
					resetTimerAndVideo={resetTimerAndVideo}
				/>
			</View>
		</ScrollView>
	);
};

// Timer and helper function
const formatTime = (time) => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	return `${minutes < 10 ? "" + minutes : minutes}:${
		seconds < 10 ? "0" + seconds : seconds
	}`;
};

const ExerciseVideo = ({ videoSource, isTimerRunning, restartVideo }) => {
	const videoRef = useRef(null);
	const [shouldPlay, setShouldPlay] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);

	// Handle video load
	const handleLoad = () => {
		setIsLoaded(true);
		setShowLoadingIndicator(false);
	};

	// Reset the video when restartVideo prop changes
	useEffect(() => {
		if (videoRef.current && isLoaded) {
			if (isTimerRunning) {
				videoRef.current.playAsync(); // Direktang i-play ang video
			} else {
				videoRef.current.replayAsync();
				videoRef.current.pauseAsync(); // Direktang i-pause ang video
			}
		}
	}, [isTimerRunning, isLoaded]);

	return (
		<View style={styles.videoContainer}>
			{showLoadingIndicator && (
				<ActivityIndicator size="large" color="green" />
			)}

			<Video
				ref={videoRef}
				source={videoSource}
				style={[
					styles.videoPlayer,
					{
						display:
							!showLoadingIndicator && isLoaded ? "flex" : "none",
					},
				]}
				shouldPlay={shouldPlay}
				isMuted={false}
				resizeMode="contain"
				isLooping
				onLoad={handleLoad}
				onError={(error) => console.log("Error loading video:", error)}
			/>
		</View>
	);
};

const ExerciseImage = ({ nextExercise, currentExercise }) => {
	return (
		<Image
			source={nextExercise ? nextExercise.image : currentExercise.image}
			style={styles.image}
		/>
	);
};

const ExerciseDescription = ({ currentExercise }) => {
	return (
		<View style={styles.perFormContainer}>
			<Text style={styles.performDescriptionTitle}>How to Perform:</Text>
			<Text style={styles.performDescription}>
				{currentExercise.performDescription}
				{"\n"}
				<Text style={styles.recommendationText}>
					Recommend timer for best warm up exercises is 25s.
				</Text>
			</Text>
		</View>
	);
};

const TimerControls = ({
	timer,
	isResting,
	isTimerRunning,
	startWarmup,
	stopWarmup,
	restartWarmup,
	resetTimerAndVideo,
}) => {
	return (
		<View>
			<Text style={styles.timerText}>{formatTime(timer)}s</Text>

			{!isResting && (
				<>
					<TouchableOpacity
						style={styles.resetIconContainer}
						onPress={() => {
							resetTimerAndVideo();
						}}
					>
						<Ionicons
							name="reload-circle"
							size={40}
							color="green"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.button,
							isTimerRunning
								? styles.pauseButton
								: styles.startButton,
						]}
						onPress={isTimerRunning ? stopWarmup : startWarmup}
					>
						<Text style={styles.buttonExercise}>
							{isTimerRunning
								? "Pause Exercise"
								: "Start Exercise"}
						</Text>
					</TouchableOpacity>
				</>
			)}
			<TouchableOpacity
				style={[styles.button, styles.restartButton]}
				onPress={restartWarmup}
			>
				<Text style={styles.buttonText}>Restart Exercise</Text>
			</TouchableOpacity>
		</View>
	);
};

// Styles moved to the last part
const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
	exerciseContainer: { marginBottom: 20 },
	heading: {
		fontSize: 35,
		fontFamily: "Karla-Bold",
		letterSpacing: -1.5,
		color: "#161616",
		marginBlock: 10,
		textAlign: "center",
	},

	timerText: {
		fontSize: 65,
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginTop: 12,
		textAlign: "center",
	},
	videoPlayer: {
		width: "102%",
		height: 235,
		marginBottom: 16,
		borderRadius: 10, // Optional: Adds rounded corners to the border
		paddingInline: 15,
	},
	image: { width: "100%", height: 250, borderRadius: 12, marginBottom: 16 },
	button: {
		paddingVertical: 12,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: { color: "black", fontSize: 18, fontFamily: "Karla-Bold" },
	performDescription: {
		fontSize: 16,
		fontFamily: "Karla-Regular",
		color: "white",
		textAlign: "center",
		marginTop: 10,
		textAlign: "left",
	},
	performDescriptionTitle: {
		fontSize: 20,
		fontFamily: "Karla-Bold",
		color: "white",
		marginBottom: 8,
	},
	perFormContainer: {
		borderWidth: 1, // Sets the width of the border
		borderColor: "#161616", // Sets the border color
		borderRadius: 10, // Optional: Adds rounded corners to the border
		paddingInline: 15,
		paddingBlock: 10, // Optional: Adds space inside the border},
		backgroundColor: "#161616",
		shadowColor: "#000", // Color of the shadow
		shadowOffset: { width: 0, height: 2 }, // Position of the shadow
		shadowOpacity: 0.25, // Transparency of the shadow
		shadowRadius: 3.5, // Blur effect of the shadow
		// Android shadow properties
		elevation: 5, // Defines the shadow's elevation (size and intensity)
	},
	recommendationText: {
		fontSize: 16,
		fontFamily: "Karla-Regular",
		color: "red",
		padding: 0,
	},

	resetIconContainer: {
		position: "absolute",
		left: 66,
		top: 28,
		alignItems: "center", // Centers the icon vertically
		justifyContent: "center", // Centers the icon horizontally
		width: 50, // Adjusts the width based on content (Ionicon size)
		height: 50, // You can adjust this if needed
	},

	startButton: { backgroundColor: "black" },
	pauseButton: { backgroundColor: "#dc3545" },
	restartButton: { borderWidth: 2, borderColor: "black", color: "black" },
	buttonExercise: { color: "white", fontFamily: "Karla-Bold", fontSize: 18 },
});

export default StartWarmups;
