import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ExerciseDescription = ({ currentExercise, isResting }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>
				{isResting ? "Rest" : currentExercise?.name}
			</Text>

			<Text style={styles.howToPerform}>
				{currentExercise.description}
			</Text>

			<View style={styles.childContainer}>
				<Text style={styles.description}>
					⏳ Recommended Duration:{" "}
					{currentExercise.recommendedDuration}
				</Text>

				<Text style={styles.description}>
					📝 Recommended Repetitions:{" "}
					{currentExercise.recommendedRepetition}
				</Text>

				<Text style={styles.description}>
					⏱️ You Set Your Duration To: {currentExercise.duration} sec
				</Text>

				<Text style={styles.description}>
					⚡ You Set Your Custom Repetitions To:{" "}
					{currentExercise.repetitions} reps
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		marginTop: hp("10%"), // Mas flexible para sa iba't ibang screen sizes
		alignItems: "center",
		paddingHorizontal: wp("5%"), // Dynamic padding
	},
	childContainer: {
		marginTop: hp("1.5%"), // Consistent spacing
	},
	howToPerform: {
		marginVertical: hp("1%"), // Vertical spacing for readability
		fontSize: wp("4.5%"), // Dynamic font size
		textAlign: "center",
	},
	description: {
		fontSize: wp("3.8%"), // Dynamic font size for better readability
		color: "#555", // Softer text color for better UI
	},
	heading: {
		fontSize: wp("6.5%"), // Bold and clear heading
		fontWeight: "bold",
		color: "black", // Energetic green tone
	},
});

export default ExerciseDescription;
