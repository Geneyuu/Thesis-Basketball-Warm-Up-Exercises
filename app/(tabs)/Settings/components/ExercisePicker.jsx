import React from "react";
import { Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const ExercisePicker = ({
	selectedExercise,
	setSelectedExercise,
	exerciseListAsync,
}) => {
	return (
		<>
			<Text style={styles.label}>Select Exercise:</Text>
			<Picker
				selectedValue={selectedExercise}
				onValueChange={(value) => setSelectedExercise(value)}
				style={styles.picker}
				// mode="dropdown"
			>
				<Picker.Item
					label="Select an exercise..."
					value=""
					color="black"
				/>
				{exerciseListAsync.map((ex) => (
					<Picker.Item
						key={ex.id}
						label={ex.name}
						value={ex.id}
						color="green"
					/>
				))}
			</Picker>
		</>
	);
};

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	picker: {
		width: "100%",
		marginBottom: 15,
	},
});

export default ExercisePicker;
