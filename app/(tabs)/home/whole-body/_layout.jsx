import React from "react";
import { Stack } from "expo-router";
import {
	TouchableOpacity,
	View,
	Text,
	Platform,
	StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Responsive helpers
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Layout = () => {
	const router = useRouter();

	return (
		<Stack>
			{/* With Ball Screen */}
			<Stack.Screen
				name="details"
				options={{
					headerShown: true,
					header: () => (
						<View
							style={{
								height: hp("8%"),
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "#fff",
								borderBottomWidth: 2.5,
								borderBottomColor: "#161616",
								paddingHorizontal: wp("2%"),
								paddingTop:
									Platform.OS === "android"
										? StatusBar.currentHeight
										: 0,
							}}
						>
							{/* Back Button */}
							<TouchableOpacity
								onPress={() => router.back()}
								style={{
									marginLeft: wp("2%"),
								}}
							>
								<Ionicons
									name="arrow-back"
									size={wp("7%")}
									color="black"
								/>
							</TouchableOpacity>

							{/* Title */}
							<View style={{ flex: 1, alignItems: "center" }}>
								<Text
									style={{
										position: "relative",
										top: 0,
										left: -wp("1%"),
										color: "#161616",
										fontSize: wp("5.5%"),
										fontFamily: "Roboto-SemiBold",
										textTransform: "capitalize",
									}}
								>
									Whole Body Exercises
								</Text>
							</View>
						</View>
					),
				}}
			/>

			{/* Start Warm-Ups Screen */}
			<Stack.Screen
				name="StartWarmUps"
				options={{
					headerShown: true,
					headerTransparent: true,
					header: () => (
						<View
							style={{
								height: hp("8%"),
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "transparent",
								paddingHorizontal: wp("2%"),
								paddingTop:
									Platform.OS === "android"
										? StatusBar.currentHeight
										: 0,
							}}
						>
							{/* Back Button */}
							<TouchableOpacity
								onPress={() => router.back()}
								style={{
									marginLeft: wp("2%"),
								}}
							>
								<Ionicons
									name="arrow-back"
									size={wp("7%")}
									color="white"
								/>
							</TouchableOpacity>

							{/* Title */}
							<View style={{ flex: 1, alignItems: "center" }}>
								<Text
									style={{
										position: "relative",
										backgroundColor: "transparent",
										top: 0,
										left: -wp("5%"),
										color: "#161616",
										fontSize: wp("6%"),
										fontFamily: "Roboto-Bold",
									}}
								></Text>
							</View>
						</View>
					),
				}}
			/>

			{/* Dynamic Screen with ID */}
			<Stack.Screen
				name="[id]"
				options={{
					headerShown: true,
					headerTransparent: true,
					header: () => (
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								height: hp("8%"),
								backgroundColor: "transparent",
								paddingHorizontal: wp("2%"),
								paddingTop:
									Platform.OS === "android"
										? StatusBar.currentHeight
										: 0,
							}}
						>
							<TouchableOpacity
								onPress={() => router.back()}
								style={{
									flexDirection: "row",
									alignItems: "center",
									padding: wp("2%"),
									marginTop: hp("2%"),
									zIndex: 10,
								}}
							>
								<Ionicons
									name="arrow-back"
									size={wp("7%")}
									color="white"
								/>
								<Text
									style={{
										color: "white",
										fontSize: wp("3.5%"),
										marginLeft: wp("2%"),
										fontFamily: "Roboto-SemiBold",
									}}
								>
									Back
								</Text>
							</TouchableOpacity>

							{/* Custom Title */}
							<View style={{ flex: 1, alignItems: "center" }}>
								<Text
									style={{
										color: "white",
										fontSize: wp("5.5%"),
										fontFamily: "Roboto-Bold",
									}}
								></Text>
							</View>
						</View>
					),
				}}
			/>
		</Stack>
	);
};

export default Layout;
