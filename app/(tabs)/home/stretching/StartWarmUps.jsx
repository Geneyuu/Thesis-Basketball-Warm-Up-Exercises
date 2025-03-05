import React, { useEffect, useContext, useState } from "react";
import { ScrollView, View, Text, StyleSheet, AppState } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Data } from "../../../_layout"; // Import Context provided in RootLayout
import ExerciseVideo from "../../home/stretching/components/StartWarmups/ExerciseVideo";
import ExerciseImage from "../../home/stretching/components/StartWarmups/ExerciseImage";
import ExerciseDescription from "../../home/stretching/components/StartWarmups/ExerciseDescription";
import TimerControls from "../../home/stretching/components/StartWarmups/TimerControls";
import exerciseList from "../../../exercisespaths/exercises";

const StartWarmups = () => {
	// Get all necessary state values from the context
	const { exerciseListAsync, restTimer } = useContext(Data);

	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(12);
	const [timer, setTimer] = useState(exerciseListAsync[12]?.duration); // Default timer
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [isResting, setIsResting] = useState(false);

	const [restartVideo, setRestartVideo] = useState(false);

	// // Get current and next exercise from the exerciseListAsync from context
	// const currentExercise = exerciseList[currentExerciseIndex];
	// const nextExercise = exerciseList[currentExerciseIndex + 1];

	// dito imemerge yung dalawang exercises
	const currentExercise = {
		...exerciseList[currentExerciseIndex],
		...exerciseListAsync[currentExerciseIndex],
	};
	// dito eh para nas currentExercisneIndex din tayo na array para dun sa Async
	const nextExercise =
		currentExerciseIndex + 1 < exerciseList.length
			? {
					...exerciseList[currentExerciseIndex + 1],
					...exerciseListAsync[currentExerciseIndex + 1],
			  }
			: null;

	// Timer control functions
	const startWarmup = () => setIsTimerRunning(true);
	const stopWarmup = () => setIsTimerRunning(false);

	// Restart the entire warmup session
	const restartWarmup = () => {
		setRestartVideo(true);
		setTimeout(() => setRestartVideo(false), 150);
		setCurrentExerciseIndex(12); // Start from index 3
		setIsResting(false);
		setIsTimerRunning(false);
		setTimer(exerciseListAsync[12]?.duration);
	};

	// Reset the timer and video for the current exercise
	const resetTimerAndVideo = () => {
		// Reset timer using current exercise duration if available
		setTimer(currentExercise.duration);
		setIsTimerRunning(false);
		setRestartVideo(true);
		setTimeout(() => setRestartVideo(false), 100);
	};

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
			// If the exercise phase ends and there are more exercises, switch to rest phase
			if (currentExerciseIndex < 14) {
				setIsResting(true);
				setTimer(restTimer);
			} else {
				// End of workout session: reset states and navigate away
				setIsTimerRunning(false);
				setCurrentExerciseIndex(12);
				setTimer(exerciseListAsync[12]?.duration);
				setIsResting(false);
				router.replace("/(tabs)/");
				setTimeout(() => {
					alert(
						"With Ball Exercises Completed! You can now play Basketball!"
					);
				}, 100);
			}
		} else if (timer === 0 && isResting) {
			// After rest, move to the next exercise and set timer based on its duration
			if (currentExerciseIndex < 14) {
				setCurrentExerciseIndex((prev) => prev + 1);
				setIsResting(false);
				// Set timer using the new current exercise's duration
				const newExercise = exerciseListAsync[currentExerciseIndex + 1];
				setTimer(newExercise.duration);
			}
		}

		return () => clearInterval(interval);
	}, [
		isTimerRunning,
		timer,
		currentExerciseIndex,
		isResting,
		exerciseListAsync,
		restTimer,
	]);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.exerciseContainer}>
				{/* Display current exercise or rest message */}
				<Text style={styles.heading}>
					{isResting ? "Rest" : currentExercise?.name}
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
						videoSource={currentExercise?.video}
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
