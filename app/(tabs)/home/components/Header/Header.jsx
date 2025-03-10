import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LogoSection from "./LogoSection";
import ProfileSection from "./ProfileSection";
import SubHeader from "./Subheader";

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
		paddingVertical: 15,
		paddingHorizontal: 20,
		// backgroundColor: "red",
		borderBottomWidth: 3,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});

export default Header;
