import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Data } from "../../../../_layout";

const ProfileSection = () => {
	const { name } = useContext(Data);
	const router = useRouter();

	return (
		<View style={styles.profileSection}>
			<View>
				<Text style={styles.greetingText}>
					Hello, <Text style={styles.greetingName}>{name}</Text>
				</Text>
				
			</View>
			<TouchableOpacity
				style={styles.profileContainer}
				onPress={() => router.push("/Profile")}
			>
				<Image
					source={require("../../../../../assets/images/cvsulogo.png")}
					style={styles.profileImage}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	profileSection: { flexDirection: "row", alignItems: "center" },
	greetingText: { fontSize: 14, color: "#000", fontFamily: "Roboto", paddingTop: 25 },
	greetingName: {
		color: "#161616",
		fontFamily: "Oswald-Bold",
		fontSize: 16,
		textTransform: "uppercase",
	},
	// subGreetingText: {
	// 	fontSize: 12,
	// 	fontFamily: "Karla-ExtraLight",
	// 	color: "#161616",
	// 	marginTop: 2,
	// 	textAlign: "right",
	// },
	profileContainer: {
		marginLeft: 5,
		width: 60,
		height: 80,
		borderRadius: 10,
		overflow: "hidden",
	},
	profileImage: { width: "100%", height: "100%", resizeMode: "contain", marginTop: 10},
});

export default ProfileSection;
