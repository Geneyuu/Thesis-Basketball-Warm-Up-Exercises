import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen
					name="[id]"
					options={{
						headerShown: true,
						headerTitleAlign: "center",
						headerTitle: "WarmUps Exercise Details",
					}}
				/>
			</Stack>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff", // Change this to match your app's background color
	},
});
export default Layout;
