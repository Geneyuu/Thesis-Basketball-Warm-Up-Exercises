import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageSlider from "./ImageSlider";

const FeaturedExercises = () => (
	<View style={styles.featuredContainer}>
		<Text style={styles.FeatureExerciseTitle}>Featured Exercises</Text>
		<ImageSlider />
	</View>
);

const styles = StyleSheet.create({
	featuredContainer: {
		width: "100%",
		alignItems: "center",
		paddingBlock: 10,
		marginTop: 50,
		position: "relative",
	},
	FeatureExerciseTitle: {
		position: "absolute",
		left: 25,
		top: -23,
		fontFamily: "Roboto-ExtraBold",
		fontSize: 20,
	},
});

export default FeaturedExercises;
