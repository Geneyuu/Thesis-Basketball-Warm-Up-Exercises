import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import exercises from "../exercisespaths/allExercises"; // Default exercises

export default function useExerciseStorage() {
	const [exerciseListAsync, setexerciseListAsync] = useState([]);
	const [restTimer, setRestTimer] = useState(null); // 🔹 Set to null para malaman kung na-load na

	//  Load Data on Mount
	useEffect(() => {
		const initializeStorage = async () => {
			try {
				//  Load Exercises
				const storedExercises = await AsyncStorage.getItem("exercises");
				if (storedExercises) {
					setexerciseListAsync(JSON.parse(storedExercises));
				} else {
					await AsyncStorage.setItem(
						"exercises",
						JSON.stringify(exercises)
					);
					setexerciseListAsync(exercises);
				}

				//  Load Rest Timer
				const storedRestTimer = await AsyncStorage.getItem("restTimer");
				if (storedRestTimer) {
					setRestTimer(Number(storedRestTimer));
				} else {
					setRestTimer(10);
					await AsyncStorage.setItem("restTimer", "10");
				}
			} catch (error) {
				console.error("Failed to initialize AsyncStorage:", error);
			}
		};

		initializeStorage();
	}, []);

	//  Save Exercises on Change
	useEffect(() => {
		if (exerciseListAsync.length) {
			AsyncStorage.setItem(
				"exercises",
				JSON.stringify(exerciseListAsync)
			).catch((error) =>
				console.error("Failed to save exercises:", error)
			);
		}
	}, [exerciseListAsync]);

	//  Save Rest Timer on Change
	useEffect(() => {
		if (restTimer !== null) {
			AsyncStorage.setItem("restTimer", String(restTimer)).catch(
				(error) => console.error("Failed to save restTimer:", error)
			);
		}
	}, [restTimer]);

	// 🔹 Return values & setters
	return { exerciseListAsync, setexerciseListAsync, restTimer, setRestTimer };
}
