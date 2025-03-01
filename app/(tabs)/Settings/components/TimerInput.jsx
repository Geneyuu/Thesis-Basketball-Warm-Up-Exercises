import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const TimerInput = ({ label, value, onChangeText }) => {
	return (
		<View style={styles.inputRow}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={styles.input}
				value={String(value)}
				onChangeText={onChangeText}
				keyboardType="numeric"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	inputRow: {
		marginVertical: 12,
	},
	label: {
		fontSize: 18,
		fontFamily: "Karla-Regular",
		color: "#161616",
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 8,
		fontSize: 16,
		fontFamily: "Karla-Regular",
		marginTop: 8,
	},
});

export default TimerInput;
