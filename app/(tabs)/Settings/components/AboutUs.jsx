import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AboutUs = () => {
	const developers = [
		{ name: "Christian Bajao", email: "christian.bajao@cvsu.edu.ph" },
		{ name: "Eugene Escario", email: "eugene.escario@cvsu.edu.ph" },
		{
			name: "James Lennard Sabellano",
			email: "jameslennard.sabellano@cvsu.edu.ph",
		},
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
		marginTop: hp("3%"),
		padding: wp("5%"),
		borderRadius: wp("3%"),
		backgroundColor: "#f8f8f8",
	},

	title: {
		fontSize: wp("5.5%"),
		fontFamily: "Roboto-ExtraBold",
		textAlign: "left",
		marginBottom: hp("2%"),
		color: "#333",
	},

	developer: {
		marginBottom: hp("2%"),
	},

	name: {
		fontSize: wp("4.5%"),
		fontWeight: "bold",
		color: "#222",
	},

	email: {
		fontSize: wp("4%"),
		color: "#555",
	},
});

export default AboutUs;
