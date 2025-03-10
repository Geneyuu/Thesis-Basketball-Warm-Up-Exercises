import React from "react";
import { Text, StyleSheet } from "react-native";

const SubHeader = () => (
	<>
		<Text style={styles.subHeaderText}>Basketball Warm-Up Exercises</Text>
		<Text style={styles.subHeaderText2}>Cavite State University</Text>
	</>
);

const styles = StyleSheet.create({
	subHeaderText: {
		fontSize: 12,
		color: "#000",
		fontFamily: "Roboto-SemiBold",
		width: "50%",
	},

	subHeaderText2: {
		fontSize: 12,
		color: "#000",
		fontFamily: "Roboto-SemiBold",
		width: "50%",
	},
});

export default SubHeader;
