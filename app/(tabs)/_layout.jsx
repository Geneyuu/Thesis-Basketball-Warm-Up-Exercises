import React from "react";
import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

// Define the TabIcon component
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
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: true,
				tabBarActiveTintColor: "#161616", // Active tab label and icon color
				tabBarInactiveTintColor: "#161616", // Inactive tab label and icon color
				tabBarStyle: {
					backgroundColor: "#fff", // Tab bar background color
					borderTopColor: "#232522", // Tab bar top border color
					elevation: 0,
					height: 80, // Tab bar height
					borderTopWidth: 1, // Removing the top border line
					paddingTop: 12, // Padding to avoid clipping with the tab icons
					paddingBottom: 5,
					paddingInline: 15,
					// borderTopLeftRadius: 20,
					// borderTopRightRadius: 20,
				},
				tabBarLabelStyle: {
					fontFamily: "Karla-Regular", // Apply the custom font
					fontSize: 12, // Adjust font size as needed
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
							name="Home"
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
		paddingTop: 0, // Add padding to avoid clipping with the border
	},
	focusedBorder: {
		width: "100%",
		height: 5,
		backgroundColor: "#161616", // Green color for the focused border
		position: "absolute",
		top: -19, // Adjust position for the border
	},
});
// dito is sa layout is kung paano mo syang gustong i-display sa screen
