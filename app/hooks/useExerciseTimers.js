import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useExerciseTimers() {
	const [exerciseTimer, setExerciseTimer] = useState(12); // Default exercise timer (in seconds)
	const [restTimer, setRestTimer] = useState(12); // Default rest timer (in seconds)
	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
	const [timer, setTimer] = useState(exerciseTimer); // Initialize with exerciseTimer
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [isResting, setIsResting] = useState(false);

	// Load timers from AsyncStorage when the hook initializes
	useEffect(() => {
		const loadTimers = async () => {
			try {
				const storedExerciseTimer = await AsyncStorage.getItem(
					"exerciseTimer"
				);
				const storedRestTimer = await AsyncStorage.getItem("restTimer");

				if (storedExerciseTimer)
					setExerciseTimer(Number(storedExerciseTimer));
				if (storedRestTimer) setRestTimer(Number(storedRestTimer));
			} catch (error) {
				console.error(
					"Failed to load timers from AsyncStorage:",
					error
				);
			}
		};
		loadTimers();
	}, []);

	// Save timers to AsyncStorage whenever they change
	useEffect(() => {
		const saveTimers = async () => {
			try {
				await AsyncStorage.setItem(
					"exerciseTimer",
					String(exerciseTimer)
				);
				await AsyncStorage.setItem("restTimer", String(restTimer));
			} catch (error) {
				console.error("Failed to save timers to AsyncStorage:", error);
			}
		};
		saveTimers();
	}, [exerciseTimer, restTimer]);

	// Update the timer whenever exerciseTimer changes
	useEffect(() => {
		setTimer(exerciseTimer);
	}, [exerciseTimer]);

	return {
		exerciseTimer,
		setExerciseTimer,
		restTimer,
		setRestTimer,
		currentExerciseIndex,
		setCurrentExerciseIndex,
		timer,
		setTimer,
		isTimerRunning,
		setIsTimerRunning,
		isResting,
		setIsResting,
	};
}
