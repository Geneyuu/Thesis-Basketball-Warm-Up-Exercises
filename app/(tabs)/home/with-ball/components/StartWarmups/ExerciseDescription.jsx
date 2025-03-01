import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ExerciseDescription = ({ currentExercise }) => {
	return (
		<View style={styles.perFormContainer}>
			<Text style={styles.performDescriptionTitle}>How to Perform:</Text>
			<Text style={styles.performDescription}>
				{currentExercise.description}
				{"\n"}
				<Text style={styles.recommendationText}>
					Recommend timer for best warm up exercises is 25s.
				</Text>
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	perFormContainer: {
		borderWidth: 1,
		borderColor: "#161616",
		borderRadius: 10,
		padding: 15,
		backgroundColor: "#161616",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
	performDescriptionTitle: {
		fontSize: 18,
		fontFamily: "Karla-Bold",
		color: "white",
		marginBottom: 10,
	},
	performDescription: {
		fontSize: 14,
		fontFamily: "Karla-Regular",
		color: "white",
		textAlign: "left",
		marginTop: 10,
	},
	recommendationText: {
		fontSize: 14,
		fontFamily: "Karla-Regular",
		color: "green",
	},
});

export default ExerciseDescription;
