import React from "react";
import { Text, TextInput, StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const InputField = ({ label, value, setValue, placeholder }) => {
	return (
		<>
			<Text style={styles.label}>{label}:</Text>
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				keyboardType="numeric"
				value={value.toString()}
				onChangeText={setValue}
				placeholderTextColor="#807e7e"
			/>
		</>
	);
};

const styles = StyleSheet.create({
	label: {
		fontSize: wp("4%"), // 16 -> responsive
		fontWeight: "bold",
		marginBottom: hp("0.5%"), // 5 -> responsive
		marginTop: hp("1%"), // 8 -> responsive
	},
	input: {
		borderWidth: 1,
		paddingVertical: hp("1.5%"), // 10 -> responsive
		paddingHorizontal: wp("3%"), // 10 -> responsive
		borderRadius: wp("1.5%"), // 5 -> responsive
		marginBottom: hp("2%"), // 15 -> responsive
		backgroundColor: "#fff",
		borderColor: "gray",
	},
});

export default InputField;
