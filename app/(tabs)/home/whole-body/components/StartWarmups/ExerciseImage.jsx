import React from "react";
import { View, Image, StyleSheet } from "react-native";

const ExerciseImage = ({ nextExercise, currentExercise }) => {
	return (
		<View style={styles.imageContainer}>
			<Image
				source={
					nextExercise ? nextExercise.image : currentExercise.image
				}
				style={styles.image}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		width: "100%",
		alignItems: "center",
		marginBottom: 20,
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 10,
	},
});

export default ExerciseImage;
