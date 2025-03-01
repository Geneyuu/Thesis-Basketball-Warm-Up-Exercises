import React, { useEffect, useContext, useState } from "react";
import { ScrollView, View, Text, StyleSheet, AppState } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Data } from "../../../_layout";
import { exercises } from "../../../../app/exercisespaths/exercises";
import ExerciseVideo from "../../home/with-ball/components/StartWarmups/ExerciseVideo";
import ExerciseImage from "../../home/with-ball/components/StartWarmups/ExerciseImage";
import ExerciseDescription from "../../home/with-ball/components/StartWarmups/ExerciseDescription";
import TimerControls from "../../home/with-ball/components/StartWarmups/TimerControls";

const StartWarmups = () => {
	// Access global state and timer values
	const {
		currentExerciseIndex,
		setCurrentExerciseIndex,
		timer,
		setTimer,
		isTimerRunning,
		setIsTimerRunning,
		isResting,
		setIsResting,
		exerciseTimer,
		restTimer,
	} = useContext(Data);

	// Get current and next exercise
	const currentExercise = exercises[currentExerciseIndex];
	const nextExercise = exercises[currentExerciseIndex + 1];

	// State to control video restart
	const [restartVideo, setRestartVideo] = useState(false);

	// Timer control functions
	const startWarmup = () => setIsTimerRunning(true);
	const stopWarmup = () => setIsTimerRunning(false);

	// Restart the entire warmup session
	const restartWarmup = () => {
		setRestartVideo(true);
		setTimeout(() => setRestartVideo(false), 150);
		setCurrentExerciseIndex(0);
		setIsResting(false);
		setIsTimerRunning(false);
		setTimer(exerciseTimer);
	};

	// Reset the timer and video for the current exercise
	const resetTimerAndVideo = () => {
		setTimer(exerciseTimer);
		setIsTimerRunning(false);
		setRestartVideo(true);
		setTimeout(() => setRestartVideo(false), 100);
	};

	// Initialize state on component mount
	useEffect(() => {
		setCurrentExerciseIndex(0);
		setIsTimerRunning(false);
		setTimer(exerciseTimer);
		setIsResting(false);
	}, []);

	// Handle app state changes (foreground/background)
	useFocusEffect(
		React.useCallback(() => {
			const handleAppStateChange = (appStatus) => {
				if (appStatus === "active") {
					setIsTimerRunning(false);
				} else {
					stopWarmup();
				}
			};

			const appStateSubscription = AppState.addEventListener(
				"change",
				handleAppStateChange
			);

			setIsTimerRunning(isResting || isTimerRunning);

			return () => {
				appStateSubscription.remove();
				stopWarmup();
				setIsTimerRunning(false);
				setRestartVideo(true);
				setTimeout(() => setRestartVideo(false), 100);
			};
		}, [isResting, isTimerRunning])
	);

	// Timer logic and exercise progression
	useEffect(() => {
		let interval;

		if (isTimerRunning && timer > 0) {
			interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
		} else if (timer === 0 && !isResting) {
			if (currentExerciseIndex < exercises.length - 1) {
				setIsResting(true);
				setTimer(restTimer);
			} else {
				setIsTimerRunning(false);
				setCurrentExerciseIndex(0);
				setTimer(exerciseTimer);
				setIsResting(false);
				router.replace("/(tabs)/");
				setTimeout(() => {
					alert(
						"With Ball Exercises Completed! You can now play Basketball!"
					);
				}, 100);
			}
		} else if (timer === 0 && isResting) {
			if (currentExerciseIndex < exercises.length - 1) {
				setCurrentExerciseIndex((prev) => prev + 1);
				setIsResting(false);
				setTimer(exerciseTimer);
			}
		}

		return () => clearInterval(interval);
	}, [isTimerRunning, timer, currentExerciseIndex, isResting]);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.exerciseContainer}>
				{/* Display current exercise or rest message */}
				<Text style={styles.heading}>
					{isResting ? "Rest" : currentExercise.name}
				</Text>

				{/* Show next exercise image during rest */}
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
					// Show video for the current exercise
					<ExerciseVideo
						videoSource={currentExercise.video}
						isTimerRunning={isTimerRunning}
						restartVideo={restartVideo}
						isResting={isResting}
					/>
				)}

				{/* Show exercise description if not resting */}
				{!isResting && (
					<ExerciseDescription currentExercise={currentExercise} />
				)}

				{/* Timer and control buttons */}
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

// Styles
const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
	exerciseContainer: { marginBottom: 20 },
	heading: {
		fontSize: 28,
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginVertical: 10,
		textAlign: "center",
	},
});

export default StartWarmups;
