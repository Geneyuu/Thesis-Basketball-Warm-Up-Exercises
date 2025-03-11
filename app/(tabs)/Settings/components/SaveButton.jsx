import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
		paddingVertical: hp("2%"), // 15 -> responsive height
		paddingHorizontal: wp("5%"), // optional horizontal padding for better scaling
		borderRadius: wp("3.5%"), // 13 -> responsive radius
		alignItems: "center",
		marginVertical: hp("1.5%"), // 10 -> responsive margin
	},
	buttonText: {
		color: "white",
		fontSize: wp("4%"), // 16 -> responsive font size
		fontWeight: "bold",
	},
});

export default SaveButton;
