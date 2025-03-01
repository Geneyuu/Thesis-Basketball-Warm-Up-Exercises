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
				<Text style={styles.subGreetingText}>Cvsu Student</Text>
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
	greetingText: { fontSize: 14, color: "#000", fontFamily: "Karla-Regular" },
	greetingName: {
		color: "#161616",
		fontFamily: "Oswald-Bold",
		fontSize: 16,
		textTransform: "uppercase",
	},
	subGreetingText: {
		fontSize: 12,
		fontFamily: "Karla-ExtraLight",
		color: "#161616",
		marginTop: 2,
		textAlign: "right",
	},
	profileContainer: {
		marginLeft: 10,
		width: 60,
		height: 60,
		borderRadius: 10,
		overflow: "hidden",
	},
	profileImage: { width: "100%", height: "100%", resizeMode: "contain" },
});

export default ProfileSection;
