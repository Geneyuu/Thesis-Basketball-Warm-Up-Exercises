import React from "react";
import { Text, StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SubHeader = () => (
	<>
		<Text style={styles.subHeaderText}>Basketball Warm-Up Exercises</Text>
		<Text style={styles.subHeaderText2}>Cavite State University</Text>
	</>
);

const styles = StyleSheet.create({
	subHeaderText: {
		fontSize: wp(3.4),
		color: "#000",
		fontFamily: "Roboto-SemiBold",
		width: wp("80"),
	},

	subHeaderText2: {
		fontSize: wp("3.4"),
		color: "#000",
		fontFamily: "Roboto-SemiBold",
		width: wp("80%"),
	},
});

export default SubHeader;
