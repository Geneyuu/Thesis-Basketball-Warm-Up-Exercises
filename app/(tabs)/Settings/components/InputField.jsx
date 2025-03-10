import React from "react";
import { Text, TextInput, StyleSheet } from "react-native";

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
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
		marginTop: 8,
	},
	input: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		marginBottom: 15,
		backgroundColor: "#fff",
		borderColor:'gray',
	},
});

export default InputField;
