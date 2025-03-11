import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
		marginVertical: hp("2%"), // 15 -> responsive
	},
	title: {
		fontFamily: "Roboto-ExtraBold",
		fontSize: wp("7.5%"), // 30 -> responsive
		fontWeight: "bold",
	},
});

export default ExerciseSettingsTitle;
