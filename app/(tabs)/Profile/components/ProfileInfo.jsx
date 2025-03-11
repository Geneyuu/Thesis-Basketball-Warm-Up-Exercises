import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ProfileInfo = ({ title, currentName }) => {
	return (
		<View>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.label}>Current Name:</Text>
			<Text style={styles.value}>{currentName}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: wp("7.5%"),
		fontFamily: "Roboto-ExtraBold",
		color: "#161616",
		marginBottom: hp("3%"),
		textAlign: "center",
	},
	label: {
		fontSize: wp("4.5%"),
		fontFamily: "Roboto-Regular",
		color: "#161616",
		marginBottom: hp("1%"),
	},
	value: {
		fontSize: wp("5%"),
		fontFamily: "Roboto-ExtraBold",
		color: "#161616",
		marginBottom: hp("2%"),
	},
});

export default ProfileInfo;
