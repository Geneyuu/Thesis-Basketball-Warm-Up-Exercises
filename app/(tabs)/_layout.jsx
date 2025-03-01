import React, { useState } from "react";
import { Tabs, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

const TabIcon = ({ name, focused, color, icon }) => {
	return (
		<View style={styles.iconWrapper}>
			{/* Show focused border when the tab is active */}
			{focused && <View style={styles.focusedBorder} />}
			<Ionicons
				name={icon}
				size={26}
				color={focused ? "#161616" : color}
			/>
		</View>
	);
};

const Layout = () => {
	// const pathname = usePathname();
	// const hiddenScreens = ["/home/with-ball/StartWarmUps"];
	// // this will hide the tab navigation when in this stack screen
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: true,
				tabBarActiveTintColor: "#161616", // Active tab label and icon color
				tabBarInactiveTintColor: "#161616", // Inactive tab label and icon color
				tabBarStyle: {
					// display: hiddenScreens.includes(pathname) ? "none" : "flex",
					backgroundColor: "#fff",
					borderTopColor: "#232522",
					elevation: 0,
					height: 80, // Tab bar height
					borderTopWidth: 1,
					paddingTop: 12,
					paddingBottom: 5,
					paddingInline: 15,
					// borderTopLeftRadius: 20,
					// borderTopRightRadius: 20,
				},
				tabBarLabelStyle: {
					fontFamily: "Karla-Regular",
					fontSize: 12,
				},
			}}
		>
			{/* Home Tab */}
			<Tabs.Screen
				name="home"
				options={{
					headerShown: false,
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size, focused }) => (
						<TabIcon
							icon={
								focused
									? "basketball-sharp"
									: "basketball-outline"
							}
							color={color}
							focused={focused}
						/>
					),
				}}
			/>

			{/* Exercises Tab */}
			<Tabs.Screen
				name="Search"
				options={{
					headerShown: false,
					tabBarLabel: "Exercises",
					tabBarIcon: ({ color, size, focused }) => (
						<TabIcon
							icon={focused ? "barbell-sharp" : "barbell-outline"}
							color={color}
							name="Exercises"
							focused={focused}
						/>
					),
				}}
			/>

			{/* Profile Tab */}
			<Tabs.Screen
				name="Profile"
				options={{
					headerShown: false,
					tabBarLabel: "Profile",
					tabBarIcon: ({ color, size, focused }) => (
						<TabIcon
							icon={focused ? "person" : "person-outline"}
							color={color}
							name="Profile"
							focused={focused}
						/>
					),
				}}
			/>

			{/* Settings Tab */}
			<Tabs.Screen
				name="Settings"
				options={{
					headerShown: false,
					tabBarLabel: "Settings",
					tabBarIcon: ({ color, size, focused }) => (
						<TabIcon
							icon={focused ? "settings" : "settings-outline"}
							color={color}
							name="Settings"
							focused={focused}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default Layout;

const styles = StyleSheet.create({
	iconWrapper: {
		alignItems: "center",
		justifyContent: "center",
		width: 60,
		paddingTop: 0,
	},
	focusedBorder: {
		width: "100%",
		height: 5,
		backgroundColor: "#161616",
		position: "absolute",
		top: -19,
	},
});
// dito is sa layout is kung paano mo syang gustong i-display sa screen
