import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AboutUs = () => {
	const developers = [
		{ name: "Juan Dela Cruz", email: "juandelacruz@email.com" },
		{ name: "Maria Santos", email: "mariasantos@email.com" },
		{ name: "Pedro Reyes", email: "pedroreyes@email.com" },
	];

	return (
		<View style={styles.container}>
			<Text style={styles.title}>About Us</Text>
			{developers.map((dev, index) => (
				<View key={index} style={styles.developer}>
					<Text style={styles.name}>{dev.name}</Text>
					<Text style={styles.email}>{dev.email}</Text>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 20,
		borderRadius: 10,
		backgroundColor: "#f8f8f8",
	},
	title: {
		fontSize: 26,
		fontFamily: "Karla-Bold",
		textAlign: "center",
		marginBottom: 10,
	},
	developer: {
		marginBottom: 15,
		alignItems: "center",
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
	},
	email: {
		fontSize: 14,
		color: "#555",
	},
});

export default AboutUs;
