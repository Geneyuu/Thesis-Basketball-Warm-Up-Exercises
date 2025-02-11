import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Layout = () => {
	const router = useRouter();

	return (
		<Stack>
			{/* With Ball Screen */}
			<Stack.Screen
				name="withball"
				options={{
					headerShown: true,
					header: () => (
						<View
							style={{
								height: 65,
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "#fff",
								borderBottomWidth: 3,
								borderBottomColor: "#161616",
								paddingHorizontal: 10,
							}}
						>
							{/* Back Button */}

							<TouchableOpacity
								onPress={() => router.back()}
								style={{
									marginLeft: 10,
								}}
							>
								<Ionicons
									name="arrow-back"
									size={28}
									color="black"
								/>
							</TouchableOpacity>
							{/* Title */}
							<View style={{ flex: 1, alignItems: "center" }}>
								<Text
									style={{
										position: "relative",
										top: 0,
										left: -20,
										color: "#161616",
										fontSize: 34,
										fontFamily: "Oswald-Bold",
										textTransform: "capitalize",
									}}
								>
									With Ball
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
								height: 65,
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "#fff",
								borderBottomWidth: 3,
								borderBottomColor: "#161616",
								paddingHorizontal: 10,
							}}
						>
							{/* Back Button */}
							<TouchableOpacity
								onPress={() => router.back()}
								style={{
									marginLeft: 10,
								}}
							>
								<Ionicons
									name="arrow-back"
									size={28}
									color="black"
								/>
							</TouchableOpacity>

							{/* Title */}
							<View style={{ flex: 1, alignItems: "center" }}>
								<Text
									style={{
										position: "relative",
										top: 0,
										left: -20,
										color: "#161616",
										fontSize: 25,
										fontFamily: "Oswald-Bold",
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
								height: 65,
								backgroundColor: "transparent",
								paddingHorizontal: 10,
							}}
						>
							<TouchableOpacity
								onPress={() => router.back()}
								style={{
									flexDirection: "row",
									alignItems: "center",
									padding: 10,
									marginTop: 20,
									zIndex: 10,
								}}
							>
								<Ionicons
									name="arrow-back"
									size={30}
									color="white"
								/>
								<Text
									style={{
										color: "white",
										fontSize: 18,
										marginLeft: 8,
										fontFamily: "Oswald-Bold",
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
										fontSize: 22,
										fontFamily: "Oswald-Bold",
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
