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
			{/* Stretching Screen */}
			<Stack.Screen
				name="stretching"
				options={{
					headerShown: true,
					header: () => (
						<View
							style={{
								height: hp(8), // 65 -> responsive height
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "#fff",
								borderBottomWidth: 2.5,
								borderBottomColor: "#161616",
								paddingHorizontal: wp(3),
							}}
						>
							{/* Back Button */}
							<TouchableOpacity
								onPress={() => router.back()}
								style={{
									marginLeft: wp(2.5), // 10 -> responsive margin
								}}
							>
								<Ionicons
									name="arrow-back"
									size={hp(3.5)} // 28 -> responsive icon
									color="black"
								/>
							</TouchableOpacity>
							{/* Title */}
							<View style={{ flex: 1, alignItems: "center" }}>
								<Text
									style={{
										position: "relative",
										top: 0,
										left: wp(-1.5), // -5 -> responsive left
										color: "#161616",
										fontSize: hp(2.8), // 23 -> responsive font
										fontFamily: "Roboto-SemiBold",
										textTransform: "capitalize",
										letterSpacing: -0.7,
									}}
								>
									Lower Body Activation
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
								height: hp(8), // 65 -> responsive height
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "transparent",
								paddingHorizontal: wp(3),
							}}
						>
							{/* Back Button */}
							<TouchableOpacity
								onPress={() => router.back()}
								style={{
									marginLeft: wp(2.5), // 10 -> responsive margin
								}}
							>
								<Ionicons
									name="arrow-back"
									size={hp(3.5)} // 28 -> responsive icon
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
										left: wp(-5), // -20 -> responsive left
										color: "#161616",
										fontSize: hp(3), // 25 -> responsive font
										fontFamily: "Roboto-SemiBold",
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
								height: hp(8), // 65 -> responsive height
								backgroundColor: "transparent",
								paddingHorizontal: wp(3),
							}}
						>
							<TouchableOpacity
								onPress={() => router.back()}
								style={{
									flexDirection: "row",
									alignItems: "center",
									padding: 5, // 10 -> responsive padding
									marginTop: hp(2.5), // 20 -> responsive marginTop
									zIndex: 10,
								}}
							>
								<Ionicons
									name="arrow-back"
									size={hp(4)} // 30 -> responsive icon size
									color="white"
								/>
								<Text
									style={{
										color: "white",
										fontSize: hp(2), // 18 -> responsive font size
										marginLeft: wp(2), // 8 -> responsive margin
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
										fontSize: hp(2.5), // 22 -> responsive font size
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
