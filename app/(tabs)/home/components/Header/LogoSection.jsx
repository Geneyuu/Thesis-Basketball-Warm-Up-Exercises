import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LogoSection = () => (
	<View style={styles.logoContainer}>
		<Text style={styles.headerText}>WarmUps</Text>
	</View>
);

const styles = StyleSheet.create({
	logoContainer: { flexDirection: "row", alignItems: "center" },
	headerText: { fontSize: 40, fontFamily: "Roboto-ExtraBold", color: "#161616", },
	
});

export default LogoSection;
