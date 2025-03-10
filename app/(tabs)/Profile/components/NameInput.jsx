import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

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
		fontSize: 18,
		fontFamily: "Karla-Regular",
		color: "#161616",
		marginBottom: 8,
	},

	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 8,
		fontSize: 16,
		fontFamily: "Karla-Regular",
		marginBottom: 24,
	},
});

export default NameInput;
