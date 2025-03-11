import React from "react";
import { Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
		fontWeight: "bold",
		paddingVertical: hp("0.8%"), // 5 -> responsive
		fontSize: wp("4%"), // 16 -> responsive
	},

	pickerStyle: {
		backgroundColor: "#E5E4E2",
		padding: wp("3%"), // 10 -> responsive
		marginVertical: hp("0.8%"), // 5 -> responsive
	},

	picker: {
		width: "100%",
		marginBottom: hp("2%"), // 15 -> responsive
		padding: wp("3%"), // 10 -> responsive
	},
});

export default ExercisePicker;
