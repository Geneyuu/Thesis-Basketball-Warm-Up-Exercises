import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AboutUs = () => {
	const developers = [
		{ name: "Christian Bajao", email: "christian.bajao@cvsu.edu.ph" },
		{ name: "Eugene Escario", email: "eugene.escario@cvsu.edu.ph" },
		{ name: "James Lennard Sabellano", email: "jameslennard.sabellano@cvsu.edu.ph" },
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
		marginTop: 20,
		padding: 10,
		borderRadius: 10,
		//backgroundColor: "#f8f8f8",
	},
	title: {
		fontSize: 22,
		fontFamily: "Roboto-ExtraBold",
		textAlign: "left",
		marginBottom: 10,
	},
	developer: {
		marginBottom: 15,
		alignItems: "left",
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
