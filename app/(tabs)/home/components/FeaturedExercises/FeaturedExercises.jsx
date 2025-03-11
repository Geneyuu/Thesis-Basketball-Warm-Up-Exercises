import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageSlider from "./ImageSlider";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FeaturedExercises = () => (
	<View style={styles.featuredContainer}>
		<Text style={styles.FeatureExerciseTitle}>Featured Exercises</Text>
		<ImageSlider />
	</View>
);

const styles = StyleSheet.create({
	featuredContainer: {
		width: wp("100%"),
		alignItems: "center",
		paddingVertical: hp(1.5),
		marginTop: hp(6),
		position: "relative",
	},
	FeatureExerciseTitle: {
		position: "absolute",
		left: wp(6),
		top: hp(-2.8),
		fontFamily: "Roboto-ExtraBold",
		fontSize: hp(2.2),
	},
});

export default FeaturedExercises;
