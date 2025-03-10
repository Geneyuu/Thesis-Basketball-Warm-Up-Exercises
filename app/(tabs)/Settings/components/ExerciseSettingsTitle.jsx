import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ExerciseSettingsTitle = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Settings</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		//alignItems: "center",
		justifyContent: "center",
		marginVertical: 15,
	},
	title: {
		fontFamily: "Roboto-ExtraBold",
		fontSize: 30,
		fontWeight:'Bold',
	},
});


export default ExerciseSettingsTitle;
