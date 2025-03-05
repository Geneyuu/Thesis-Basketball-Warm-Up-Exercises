import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import exercises from "../exercisespaths/allExercises"; // Default exercises

export default function useExerciseStorage() {
	const [exerciseListAsync, setexerciseListAsync] = useState([]);
	const [restTimer, setRestTimer] = useState(10); // Default rest timer

	//  Load Exercises & Rest Timer from AsyncStorage
	useEffect(() => {
		const loadData = async () => {
			try {
				// Load Exercises
				const storedExercises = await AsyncStorage.getItem("exercises");
				if (storedExercises) {
					setexerciseListAsync(JSON.parse(storedExercises));
				} else {
					setexerciseListAsync(exercises);
					await AsyncStorage.setItem(
						"exercises",
						JSON.stringify(exercises)
					);
				}
				// Load Rest Timer
				const storedRestTimer = await AsyncStorage.getItem("restTimer");
				if (storedRestTimer) {
					setRestTimer(JSON.parse(storedRestTimer));
				}
			} catch (error) {
				console.error(
					"Failed to initialize timers from AsyncStorage:",
					error
				);
			}
		};

		loadData();
	}, []); //  Removed restTimer from dependency array

	// Save Exercises when updated
	useEffect(() => {
		const saveExercises = async () => {
			try {
				await AsyncStorage.setItem(
					"exercises",
					JSON.stringify(exerciseListAsync)
				);
			} catch (error) {
				console.error("Error saving exercises:", error);
			}
		};

		if (exerciseListAsync.length) saveExercises();
	}, [exerciseListAsync]);

	//  Save Rest Timer when updated
	useEffect(() => {
		const saveTimers = async () => {
			try {
				await AsyncStorage.setItem(
					"restTimer",
					JSON.stringify(restTimer)
				);
			} catch (error) {
				console.error("Failed to save timers to AsyncStorage:", error);
			}
		};

		saveTimers();
	}, [restTimer]);

	// Return all states and functions for easy access
	return {
		exerciseListAsync,
		setexerciseListAsync,
		restTimer,
		setRestTimer,
	};
}
