import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const SaveButton = ({ onPress }) => {
	return (
		<TouchableOpacity style={styles.saveButton} onPress={onPress}>
			<Text style={styles.saveButtonText}>Save Settings</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	saveButton: {
		backgroundColor: "black",
		paddingVertical: 12,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	saveButtonText: {
		color: "#fff",
		fontSize: 18,
		fontFamily: "Karla-Bold",
	},
});

export default SaveButton;
