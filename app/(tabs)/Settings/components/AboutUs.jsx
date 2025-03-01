import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AboutUs = () => {
	return (
		<View style={styles.aboutUs}>
			<Text style={styles.aboutTitle}>About Us</Text>
			<Text style={styles.aboutText}>Developed by:</Text>
			<Text style={styles.developerName}>Christian Bajao</Text>
			<Text style={styles.developerName}>Eugene Escario</Text>
			<Text style={styles.developerName}>Lennard Sabellano</Text>
			<Text style={styles.aboutText}>Email: yourname@example.com</Text>
			<Text style={styles.aboutText}>Version: 1.0.0</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	aboutUs: {
		flex: 1,
		marginTop: 40,
		borderTopWidth: 1,
		borderTopColor: "#ccc",
		paddingTop: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	aboutTitle: {
		fontSize: 24,
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginBottom: 10,
		textAlign: "center",
	},
	aboutText: {
		fontSize: 16,
		fontFamily: "Karla-Regular",
		color: "#161616",
		textAlign: "center",
		marginBottom: 8,
	},
	developerName: {
		fontSize: 16,
		fontFamily: "Karla-Regular",
		color: "#161616",
		textAlign: "center",
		marginBottom: 4,
	},
});

export default AboutUs;
