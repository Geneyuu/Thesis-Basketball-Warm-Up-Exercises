import React, { createContext } from "react"; // Import useState here
import { Stack } from "expo-router";
import useName from "./hooks/useName"; // Import custom hook for name

import useExerciseStorage from "./hooks/useExerciseStorage";

export const Data = createContext();
// so gumamit lang ako dito ng Cointext API para sa pagpasa ng data sa ibang components since hindi pwede irekta yung pagpasa ng data sa ibang components

export default function RootLayout() {
	const { name, setName } = useName(); // dito ginamit ko na yung useName

	const { exerciseListAsync, setexerciseListAsync, restTimer, setRestTimer } =
		useExerciseStorage();

	return (
		<Data.Provider
			value={{
				name,
				setName,
				setexerciseListAsync,
				exerciseListAsync,
				restTimer,
				setRestTimer,
			}}
		>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</Data.Provider>
	);
}

// kung ano bang fomat or skeleton na magiging screen natin.
//<Stack> automatically manages screens based on file structure.
