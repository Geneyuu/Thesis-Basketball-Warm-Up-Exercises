import React, { createContext } from "react"; // Import useState here
import { Stack } from "expo-router";
import useName from "./hooks/useName"; // Import custom hook for name
import useExerciseTimers from "./hooks/useExerciseTimers"; // Import custom hook for timers and exercise states

export const Data = createContext();
// so gumamit lang ako dito ng Cointext API para sa pagpasa ng data sa ibang components since hindi pwede irekta yung pagpasa ng data sa ibang components

export default function RootLayout() {
	const { name, setName } = useName();
	const {
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
	} = useExerciseTimers();

	return (
		<Data.Provider
			value={{
				name,
				setName,
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
			}}
		>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</Data.Provider>
	);
}
