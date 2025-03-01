import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CategoryCard = ({ title, imageUri, navigationPath }) => {
	const router = useRouter();

	return (
		<TouchableOpacity
			style={styles.categoryCard}
			onPress={() => router.push(navigationPath)}
		>
			<Image style={styles.cardImage} source={imageUri} />
			<Text style={styles.cardText}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	categoryCard: {
		width: "47%",
		alignItems: "center",
	},
	cardImage: {
		width: wp(40),
		height: hp(12.5),
		borderRadius: 10,
		marginTop: 10,
	},
	cardText: {
		marginTop: 5,
		fontSize: wp(3.5),
		textAlign: "center",
		fontFamily: "Karla-Regular",
		color: "#000",
	},
});

export default CategoryCard;
