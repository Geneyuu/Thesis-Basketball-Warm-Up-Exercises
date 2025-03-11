import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SaveButton = ({ onPress }) => {
	return (
		<TouchableOpacity style={styles.saveButton} onPress={onPress}>
			<Text style={styles.saveButtonText}>Save Profile</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	saveButton: {
		backgroundColor: "black",
		paddingVertical: hp("1.5%"),
		borderRadius: wp("2%"),
		justifyContent: "center",
		alignItems: "center",
		marginTop: hp("2%"),
	},
	saveButtonText: {
		color: "#fff",
		fontSize: wp("4.5%"),
		fontFamily: "Roboto-SemiBold",
	},
});

export default SaveButton;
