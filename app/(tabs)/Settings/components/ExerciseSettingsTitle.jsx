import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ExerciseSettingsTitle = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Exercise Settings</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 15,
	},
	title: {
		fontFamily: "Karla-Bold",
		fontSize: 24,
	},
});

export default ExerciseSettingsTitle;
