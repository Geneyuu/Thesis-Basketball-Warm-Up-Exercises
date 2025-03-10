import React from "react";
import { Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { textChangeRangeIsUnchanged } from "typescript";

const ExercisePicker = ({
	selectedExercise,
	setSelectedExercise,
	exerciseListAsync,
}) => {
	return (
		<>
			<Text style={styles.text}>Exercise:</Text>
			<Picker
				selectedValue={selectedExercise}
				onValueChange={(value) => setSelectedExercise(value)}
				// mode="dropdown"
				style={styles.pickerStyle}
			>
				<Picker.Item
					label="Select an exercise.."
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

	text: {
		// backgroundColor: 'red',
		fontWeight: 'Bold',
		paddingVertical: 5,
		fontSize: 16,
	},
	pickerStyle: {
		backgroundColor: '#E5E4E2',
		padding: 10,
		marginVertical: 5,
	},

});

export default ExercisePicker;
