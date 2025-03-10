import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const SaveButton = ({ onPress, title }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "black",
		padding: 15,
		borderRadius: 13,
		alignItems: "center",
		marginVertical: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default SaveButton;
