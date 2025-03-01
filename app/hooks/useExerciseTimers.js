import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useExerciseTimers() {
	const [exerciseTimer, setExerciseTimer] = useState(13); // Default exercise timer eto yung
	const [restTimer, setRestTimer] = useState(12); // Default rest timer
	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0); // eto eh para sa memory ng mga exercisesdata para may control tayo kung panong flow ang gusto nating mangyari.
	const [timer, setTimer] = useState(exerciseTimer); // Initialize with default exercise timer so syempre ayaw natin baguhin yung default value kaya gumawa tayo ng another memory state para magbase lang yung countdown timer sa default values ng exerciseTimer at rest timer.
	const [isTimerRunning, setIsTimerRunning] = useState(false); // eto eh para sa memory ng buttons dun sa start Exercise button
	const [isResting, setIsResting] = useState(false); // eto ay para sa resting phase naman.

	// ✅ Load timers from AsyncStorage kapag nag-mount ang component
	useEffect(() => {
		const initializeTimers = async () => {
			try {
				// Kunin ang stored exercise timer at rest timer mula sa AsyncStorage
				const storedExerciseTimer = await AsyncStorage.getItem(
					"exerciseTimer"
				);
				const storedRestTimer = await AsyncStorage.getItem("restTimer");

				// Kapag walang naka-save na value, isave yung default value ng exerciseTimer at isave sa AsyncStorage
				if (!storedExerciseTimer) {
					await AsyncStorage.setItem(
						"exerciseTimer",
						JSON.stringify(exerciseTimer)
					);
				} else {
					// Kapag may existing na value, convert from string to number at iset sa state
					setExerciseTimer(JSON.parse(storedExerciseTimer));
					setTimer(JSON.parse(storedExerciseTimer)); // Update ang countdown timer
				}

				if (!storedRestTimer) {
					await AsyncStorage.setItem("restTimer", JSON.stringify(12));
				} else {
					setRestTimer(JSON.parse(storedRestTimer)); // Convert back to number
				}
			} catch (error) {
				console.error(
					"Failed to initialize timers from AsyncStorage:",
					error
				);
			}
		};

		initializeTimers(); // Tawagin ang function para mag-load ng data
	}, []);

	// Save timers to AsyncStorage kapag nagbago ang exerciseTimer o restTimer
	useEffect(() => {
		const saveTimers = async () => {
			try {
				// Isave ang bagong exerciseTimer at restTimer sa AsyncStorage
				await AsyncStorage.setItem(
					"exerciseTimer",
					JSON.stringify(exerciseTimer)
				);
				await AsyncStorage.setItem(
					"restTimer",
					JSON.stringify(restTimer)
				);
			} catch (error) {
				console.error("Failed to save timers to AsyncStorage:", error);
			}
		};

		saveTimers(); // Tawagin ang function kapag may nagbago sa timers
	}, [exerciseTimer, restTimer]);

	// Kapag nagbago ang exerciseTimer, i-update din ang countdown timer
	// useEffect(() => {
	// 	setTimer(exerciseTimer); // Isync ang timer sa bagong exerciseTimer
	// }, [exerciseTimer]);

	//  return lahat ng states para magamit sa ibang component
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
