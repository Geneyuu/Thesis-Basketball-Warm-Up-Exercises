import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Data } from "../../../../_layout";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
	profileSection: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},

	greetingText: {
		fontSize: hp(2),
		color: "#000",
		fontFamily: "Roboto-Regular",
		marginTop: hp(0.5),
		marginRight: wp(2.5),
	},

	greetingName: {
		color: "#161616",
		fontFamily: "Roboto-ExtraBold",
		fontSize: hp(1.8),
		textTransform: "uppercase",
	},

	profileContainer: {
		width: wp(15),
		height: wp(15),
		alignItems: "center",
		justifyContent: "center",
	},

	profileImage: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
});

export default ProfileSection;
