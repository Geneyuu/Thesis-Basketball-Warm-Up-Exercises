import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const NameInput = ({ label, value, onChangeText }) => {
	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter new name"
				value={value}
				onChangeText={onChangeText}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		fontSize: wp("4.5%"),
		fontFamily: "Roboto-Regular",
		color: "#161616",
		marginBottom: hp("1%"),
	},

	input: {
		height: hp("6%"),
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: wp("2%"),
		paddingHorizontal: wp("3%"),
		fontSize: wp("4%"),
		fontFamily: "Roboto-Regular",
		marginBottom: hp("3%"),
	},
});

export default NameInput;
