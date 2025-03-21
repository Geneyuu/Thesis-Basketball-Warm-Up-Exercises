import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	Animated,
	StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const scaleValue = new Animated.Value(1);

export default function Index() {
	const [fontsLoaded, setFontsLoaded] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const loadFonts = async () => {
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
					"Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
					"Roboto-SemiBold": require("../assets/fonts/Roboto-SemiBold.ttf"),
					"Roboto-ExtraBold": require("../assets/fonts/Roboto-ExtraBold.ttf"),
				});
				setFontsLoaded(true);
				console.log("Fonts loaded successfully.");
			} catch (error) {
				console.error("Error loading fonts:", error);
			}
		};

		loadFonts();

		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(scaleValue, {
					toValue: 1.1,
					duration: 1500,
					useNativeDriver: true,
				}),
				Animated.timing(scaleValue, {
					toValue: 1,
					duration: 1500,
					useNativeDriver: true,
				}),
			])
		);

		animation.start();

		return () => {
			animation.stop();
		};
	}, []);

	useEffect(() => {
		setTimeout(() => {
			router.replace("/(tabs)/home");
		}, 6000);
	}, []);

	if (!fontsLoaded) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

			<Animated.Image
				source={require("../assets/images/applogo_modified.png")}
				style={[
					styles.splashImage,
					{ transform: [{ scale: scaleValue }] },
				]}
			/>

			<Text style={styles.text}>Basketball Warm Ups</Text>

			<Image
				source={require("../assets/images/cvsulogo.png")}
				style={styles.universityLogo}
			/>

			<Text style={styles.universityText}>Cavite State University</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffff",
	},

	splashImage: {
		width: wp("35%"),
		height: wp("35%"),
		marginBottom: hp("2%"),
	},

	text: {
		marginTop: hp("2%"),
		fontSize: hp("3%"),
		width: wp("50%"),
		textTransform: "uppercase",
		color: "#333333",
		fontFamily: "Karla-Bold",
		letterSpacing: 0.5,
		textAlign: "center",
	},

	universityLogo: {
		position: "absolute",
		bottom: hp("8%"),
		width: wp("15%"),
		height: wp("15%"),
		resizeMode: "contain",
	},

	universityText: {
		position: "absolute",
		bottom: hp("4%"),
		fontSize: hp("2.2%"),
		color: "#333333",
		fontFamily: "Karla-SemiBold",
		textAlign: "center",
		textTransform: "uppercase",
		width: wp("80%"),
	},
});
