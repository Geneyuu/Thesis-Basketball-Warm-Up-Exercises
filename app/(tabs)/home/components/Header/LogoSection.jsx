import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LogoSection = () => (
	<View style={styles.logoContainer}>
		<Text style={styles.headerText}>WarmUps</Text>
	</View>
);

const styles = StyleSheet.create({
	logoContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: hp(1.3),
	},

	headerText: {
		fontSize: hp(4.5),
		fontFamily: "Roboto-ExtraBold",
		color: "#161616",
	},
});

export default LogoSection;
