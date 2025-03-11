import React from "react";
import { View, Image, StyleSheet } from "react-native";

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
		width: wp("100%"),
		alignItems: "center",
		justifyContent: "center",
		marginVertical: hp("1.5%"),
	},
	image: {
		width: wp("55%"),
		height: hp("16%"),
		borderRadius: hp("1%"),
	},
});

export default ExerciseImage;
