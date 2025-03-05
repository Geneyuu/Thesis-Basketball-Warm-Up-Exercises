import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ExerciseDescription = ({ currentExercise, recommendedRepetition }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>How to Perform</Text>
			<Text style={styles.description}>
				{currentExercise.description}
			</Text>

			<View style={styles.detailsContainer}>
				<Text style={styles.detailText}>
					<Text style={styles.highlight}>
						⏳ Recommended Duration:
					</Text>{" "}
					{currentExercise.recommendedDuration}
				</Text>

				<Text style={styles.detailText}>
					<Text style={styles.highlight}>
						📝 Recommended Repetitions:
					</Text>{" "}
					{currentExercise.recommendedRepetition}
				</Text>
				<Text style={styles.detailText}>
					<Text style={styles.customhiglight}>
						⏱️ You Set Your Duration To:
					</Text>{" "}
					{currentExercise.duration} sec
				</Text>
				<Text style={styles.detailText}>
					<Text style={styles.customhiglight}>
						⚡ You Set Your Custom Repetitions To:
					</Text>{" "}
					{currentExercise.repetitions} reps
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#181818",
		padding: wp("5%"),
		borderRadius: wp("4%"),
		marginVertical: hp("1.5%"),
		shadowColor: "#000",
		shadowOffset: { width: 0, height: hp("0.5%") },
		shadowOpacity: 0.3,
		shadowRadius: hp("1%"),
		elevation: 6,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.1)",
	},
	title: {
		fontSize: wp("3.5%"),
		fontFamily: "Karla-Bold",
		color: "#FFFFFF",
		marginBottom: hp("1%"),
		textAlign: "left",
		letterSpacing: wp("0.3%"),
	},
	description: {
		fontSize: wp("3%"),
		fontFamily: "Karla-Regular",
		color: "#BBBBBB",
		textAlign: "justify",
	},
	detailsContainer: {
		padding: wp("3%"),
		borderRadius: wp("3%"),
		backgroundColor: "#222",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.1)",
	},
	detailText: {
		fontSize: wp("3%"),
		fontFamily: "Karla-Regular",
		color: "#EEEEEE",
		marginBottom: hp("0.5%"),
	},
	highlight: {
		color: "green",
		fontFamily: "Karla-Bold",
	},
	customhiglight: {
		color: "#00D4FF",
		fontFamily: "Karla-Bold",
	},
});

export default ExerciseDescription;
