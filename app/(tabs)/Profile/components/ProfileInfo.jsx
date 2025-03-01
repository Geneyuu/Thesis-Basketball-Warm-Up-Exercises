import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
		fontSize: 30,
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginBottom: 24,
		textAlign: "center",
	},
	label: {
		fontSize: 18,
		fontFamily: "Karla-Regular",
		color: "#161616",
		marginBottom: 8,
	},
	value: {
		fontSize: 20,
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginBottom: 16,
	},
});

export default ProfileInfo;
