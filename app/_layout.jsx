import React, { createContext, useState } from "react"; // Import useState here
import { Stack } from "expo-router";
import useName from "./hooks/useName"; // Import custom hook for name
import useExerciseTimers from "./hooks/useExerciseTimers"; // Import custom hook for timers and exercise states

export const Data = createContext();
// so gumamit lang ako dito ng Cointext API para sa pagpasa ng data sa ibang components since hindi pwede irekta yung pagpasa ng data sa ibang components

export default function RootLayout() {
	const [name, setName] = useName();
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
				{" "}
				// pag wala neto hindi magwowork yung navigation at di mo rin
				makikita sa screens
				{/* Ito yung pinaka-navigation stack mo. 
      			Lahat ng screens na ilalagay mo dito ay magiging part ng stack navigation. */}
				<Stack.Screen name="index" options={{ headerShown: false }} />
				{/* 
				- Ito yung unang screen na ipapakita (default screen). 
				- Dahil ito ang "index", automatic siyang una sa listahan. 
				- `headerShown: false` → Hindi ipapakita yung header.
  				*/}
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				{/* 
				- Ito yung "tabs" navigation folder mo. 
				- Ibig sabihin, pag pumasok ka sa isang tab (e.g., Home, Profile, Settings), 
				yung mga laman nun ay nasa ilalim ng `(tabs)`. 
				- Kahit wala siya sa stack na ‘to, gagana pa rin kasi nasa `_layout.jsx` siya.  at file base routing ang expo kaya automatic kahit wala to 
			*/}
			</Stack>
		</Data.Provider>
	);
}
