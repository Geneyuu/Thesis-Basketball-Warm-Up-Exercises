import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
				name="inplace"
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
								paddingHorizontal: wp("2.5%"),
							}}
						>
							{/* Back Button */}
							<TouchableOpacity
								onPress={() => router.back()}
								style={{
									marginLeft: wp("2.5%"),
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
										top: hp("0%"),
										left: wp("-1.5%"),
										color: "#161616",
										fontSize: wp("5.5%"),
										fontFamily: "Roboto-SemiBold",
										textTransform: "capitalize",
									}}
								>
									Dynamic Exercises
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
					header: () => (
						<View
							style={{
								height: hp("8%"),
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "#fff",
								borderBottomWidth: 0.4,
								borderBottomColor: "#161616",
								paddingHorizontal: wp("2.5%"),
							}}
						>
							{/* Back Button */}
							<TouchableOpacity
								onPress={() => router.back()}
								style={{
									marginLeft: wp("2.5%"),
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
										top: hp("0%"),
										left: wp("-5%"),
										color: "#161616",
										fontSize: wp("6%"),
										fontFamily: "Roboto-SemiBold",
									}}
								>
									Start Warm-Ups
								</Text>
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
								paddingHorizontal: wp("2.5%"),
							}}
						>
							<TouchableOpacity
								onPress={() => router.back()}
								style={{
									flexDirection: "row",
									alignItems: "center",
									padding: wp("2.5%"),
									marginTop: hp("2%"),
									zIndex: 10,
								}}
							>
								<Ionicons
									name="arrow-back"
									size={wp("8%")}
									color="white"
								/>
								<Text
									style={{
										color: "white",
										fontSize: wp("4.5%"),
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
										fontFamily: "Roboto-SemiBold",
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
