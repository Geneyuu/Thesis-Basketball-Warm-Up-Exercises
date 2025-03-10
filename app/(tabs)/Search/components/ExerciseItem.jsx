import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

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
		padding: 10,
		marginInline: 18,
		marginBottom: 12,
		borderRadius: 10,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		
	},
	exerciseImage: { width: 70, height: 70, borderRadius: 10, marginRight: 15 },
	exerciseText: {
		fontSize: 15,
		color: "#161616",
		fontWeight: "600",
		fontFamily: "Roboto-Regular",
	},
});

export default ExerciseItem;
