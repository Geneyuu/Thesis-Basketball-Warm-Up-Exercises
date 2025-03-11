import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ExerciseItem = ({ item, onPress, disabled }) => {
	return (
		<TouchableOpacity
			style={styles.exerciseItem}
			onPress={onPress}
			disabled={disabled}
		>
			<Image source={item.image} style={styles.exerciseImage} />
			<Text style={styles.exerciseText}>{item.name}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	exerciseItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		paddingVertical: hp("1.5%"),
		paddingHorizontal: wp("4%"),
		marginHorizontal: wp("4.5%"),
		marginBottom: hp("1.5%"),
		borderRadius: wp("2.5%"),
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	exerciseImage: {
		width: wp("15%"),
		height: wp("15%"),
		borderRadius: wp("2%"),
		marginRight: wp("4%"),
	},
	exerciseText: {
		fontSize: wp("4.2%"),
		color: "#161616",
		fontFamily: "Roboto-SemiBold",
	},
});

export default ExerciseItem;
