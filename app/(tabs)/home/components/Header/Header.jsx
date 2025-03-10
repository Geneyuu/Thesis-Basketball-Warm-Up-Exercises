import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LogoSection from "./LogoSection";
import ProfileSection from "./ProfileSection";
import SubHeader from "./Subheader";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Header = () => (
	<View style={styles.header}>
		<View style={styles.headerRow}>
			<LogoSection />
			<ProfileSection />
		</View>
		<SubHeader />
	</View>
);

const styles = StyleSheet.create({
	header: {
		paddingVertical: hp(2), // Responsive vertical padding
		paddingHorizontal: wp(5), // Responsive horizontal padding
		borderBottomWidth: hp(0.3), // Responsive border thickness
		borderBottomColor: "black", // You can adjust color if needed
	},

	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});

export default Header;
