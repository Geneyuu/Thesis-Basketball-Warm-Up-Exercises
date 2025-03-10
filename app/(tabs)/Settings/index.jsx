import React, { useContext, useEffect, useReducer } from "react";
import { ScrollView, Alert, StyleSheet } from "react-native";
import { Data } from "./../../_layout";
import ExercisePicker from "./components/ExercisePicker";
import InputField from "./components/InputField";
import SaveButton from "./components/SaveButton";
import AboutUs from "./components/AboutUs";
import ExerciseSettingsTitle from "./components/ExerciseSettingsTitle";
// Initial State
const initialState = {
	selectedExercise: "",
	duration: "",
	repetitions: "",
};

// Reducer Function try lang lol
const reducer = (state, action) => {
	switch (action.type) {
		case "SET_EXERCISE":
			return { ...state, selectedExercise: action.payload };
		case "SET_DURATION":
			return { ...state, duration: action.payload };
		case "SET_REPETITIONS":
			return { ...state, repetitions: action.payload };
		case "RESET":
			return initialState;
		default:
			return state;
	}
};

export default function Settings() {
	const { exerciseListAsync, setexerciseListAsync, restTimer, setRestTimer } =
		useContext(Data);

	const [state, dispatch] = useReducer(reducer, initialState);

	// Load exercise details when selection changes
	useEffect(() => {
		const exercise = exerciseListAsync.find(
			(ex) => ex.id === state.selectedExercise
		);
		dispatch({ type: "SET_DURATION", payload: exercise?.duration || "" });
		dispatch({
			type: "SET_REPETITIONS",
			payload: exercise?.repetitions || "",
		});
	}, [state.selectedExercise, exerciseListAsync]); // <-- Dinagdag exerciseListAsync

	// Save updated exercise settings
	const handleSaveSettings = () => {
		if (!state.selectedExercise) {
			Alert.alert("Error", "Please select an exercise.");
			return;
		}

		const updatedExercises = exerciseListAsync.map((ex) =>
			ex.id === state.selectedExercise
				? {
						...ex,
						duration: state.duration
							? Number(state.duration)
							: ex.duration,
						repetitions: state.repetitions
							? Number(state.repetitions)
							: ex.repetitions,
				  }
				: ex
		);

		setexerciseListAsync(updatedExercises);
		Alert.alert("Success", "Exercise settings updated!");
	};

	// Save Rest Timer (Inside Component)
	const handleSaveRestTimer = () => {
		const newRestTimer = Number(restTimer);
		if (isNaN(newRestTimer) || newRestTimer < 0) {
			Alert.alert("Error", "Please enter a valid rest time.");
			return;
		}

		setRestTimer(newRestTimer);
		Alert.alert("Success", "Rest timer updated!");
	};

	return (
		<ScrollView
			style={styles.container}
			keyboardShouldPersistTaps="handled"
		>
			<ExerciseSettingsTitle />
			<ExercisePicker
				selectedExercise={state.selectedExercise}
				setSelectedExercise={(value) =>
					dispatch({ type: "SET_EXERCISE", payload: value })
				}
				exerciseListAsync={exerciseListAsync}
			/>

			<InputField
				label="Duration (seconds)"
				value={state.duration}
				setValue={(value) =>
					dispatch({ type: "SET_DURATION", payload: value })
				}
				placeholder="Enter duration"
			/>

			<InputField
				label="Repetitions"
				value={state.repetitions}
				setValue={(value) =>
					dispatch({ type: "SET_REPETITIONS", payload: value })
				}
				placeholder="Enter repetitions"
			/>

			<SaveButton onPress={handleSaveSettings} title="Save Settings" />

			{/* REST TIMER INPUT - Ensure it updates properly */}
			<InputField
				label="Global Rest Timer (seconds)"
				value={restTimer}
				setValue={(value) => setRestTimer(value)}
				placeholder="Enter rest time"
			/>

			<SaveButton onPress={handleSaveRestTimer} title="Save Rest Timer" />

			<AboutUs />
		</ScrollView>
	);
}

// Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	SaveButton: {
		borderRadius: 100,
	},
});
