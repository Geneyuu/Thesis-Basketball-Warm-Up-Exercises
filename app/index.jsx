import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Animated } from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";

export default function Index() {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	// Create an animated value
	const scaleValue = new Animated.Value(1);

	useEffect(() => {
		// Preload the fonts
		const loadAssets = async () => {
			try {
				console.log("Loading fonts...");
				await Font.loadAsync({
					"Karla-Regular": require("../assets/fonts/Karla-Regular.ttf"),
					"Karla-Bold": require("../assets/fonts/Karla-Bold.ttf"),
					"Karla-SemiBold": require("../assets/fonts/Karla-SemiBold.ttf"),
					"Karla-BoldItalic": require("../assets/fonts/Karla-BoldItalic.ttf"),
					"Karla-ExtraBold": require("../assets/fonts/Karla-ExtraBold.ttf"),
					"Karla-ExtraBoldItalic": require("../assets/fonts/Karla-ExtraBoldItalic.ttf"),
					"Karla-ExtraLight": require("../assets/fonts/Karla-ExtraLight.ttf"),
					"Karla-ExtraLightItalic": require("../assets/fonts/Karla-ExtraLightItalic.ttf"),
					"Karla-Italic": require("../assets/fonts/Karla-Italic.ttf"),
					"Karla-Light": require("../assets/fonts/Karla-Light.ttf"),
					"Karla-LightItalic": require("../assets/fonts/Karla-LightItalic.ttf"),
					"Karla-Medium": require("../assets/fonts/Karla-Medium.ttf"),
					"Karla-MediumItalic": require("../assets/fonts/Karla-MediumItalic.ttf"),
					"Karla-SemiBoldItalic": require("../assets/fonts/Karla-SemiBoldItalic.ttf"),
					"Oswald-Bold": require("../assets/fonts/Oswald-Bold.ttf"),
					"Oswald-Regular": require("../assets/fonts/Oswald-Regular.ttf"),
				});

				console.log("Fonts loaded successfully.");

				// Set a longer delay to show splash screen for 10 seconds
				setTimeout(() => {
					setIsLoading(false);
				}, 6000);
			} catch (error) {
				console.error("Error loading fonts:", error);
				setIsLoading(false);
			}
		};

		loadAssets();
	}, []);

	// Start the animation when the component mounts
	useEffect(() => {
		if (isLoading) {
			Animated.loop(
				Animated.sequence([
					Animated.timing(scaleValue, {
						toValue: 1.1, // scale to 1.1x
						duration: 1500, // duration of 1.5 seconds
						useNativeDriver: true,
					}),
					Animated.timing(scaleValue, {
						toValue: 1, // back to original size
						duration: 2000, // duration of 2 seconds
						useNativeDriver: true,
					}),
				])
			).start();
		}
	}, [isLoading]);

	useEffect(() => {
		if (!isLoading) {
			router.replace("/(tabs)/home"); // Redirect after the delay
		}
	}, [isLoading]);

	if (isLoading) {
		return (
			<View style={styles.container}>
				{/* Animated splash screen image */}
				<Animated.Image
					source={require("../assets/images/applogo_modified.png")} // Ensure the path is correct
					style={[
						styles.splashImage,
						{ transform: [{ scale: scaleValue }] },
					]} // Apply scale animation
				/>
				<Text style={styles.text}>Basketball Warm Ups</Text>
				{/* Positioned at the bottom of the screen */}
				<Image
					source={require("../assets/images/cvsulogo.png")} // Logo above text
					style={styles.universityLogo}
				/>
				<Text style={styles.universityText}>
					Cavite State University
				</Text>
			</View>
		);
	}

	return null;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffff",
	},
	splashImage: {
		width: 150, // Adjust size as needed
		height: 150, // Adjust size as needed
		marginBottom: 20,
	},
	text: {
		marginTop: 20,
		fontSize: 25,
		width: "45%",
		textTransform: "uppercase",
		color: "#333333",
		fontFamily: "Karla-Bold", // Optional: Set a bold font
		letterSpacing: 0,
		textAlign: "center",
	},
	universityText: {
		position: "absolute",
		bottom: 45, // Position it at the bottom of the screen
		fontSize: 18,
		color: "#333333",
		fontFamily: "Karla-SemiBold", // Optional: Set Ba regular font
		textAlign: "center",
		textTransform: "uppercase",
	},
	universityLogo: {
		position: "absolute",
		bottom: 70,
		width: 60,
		height: 60,
		resizeMode: "contain",
	},
});
