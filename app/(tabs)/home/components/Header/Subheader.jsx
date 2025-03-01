import React from "react";
import { Text, StyleSheet } from "react-native";

const SubHeader = () => (
	<Text style={styles.subHeaderText}>
		Basketball Warm-Up Exercises, exclusive for Cavite State University.
	</Text>
);

const styles = StyleSheet.create({
	subHeaderText: {
		fontSize: 10,
		color: "#000",
		fontFamily: "Karla-ExtraLight",
		width: "50%",
	},
});

export default SubHeader;
