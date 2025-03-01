import React, { useContext, useState } from "react";
import {
	View,
	Text,
	Alert,
	ScrollView,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import { Data } from "../../_layout";
import { useRouter } from "expo-router";
import TimerInput from "../Settings/components/TimerInput";
import SaveButton from "../Settings/components/SaveButton";
import AboutUs from "../Settings/components/AboutUs";

const Settings = () => {
	const { exerciseTimer, setExerciseTimer, restTimer, setRestTimer } =
		useContext(Data);
	const router = useRouter();

	const handleSave = () => {
		if (!exerciseTimer || !restTimer) {
			Alert.alert("Invalid Input", "Please input a number.");
			return;
		}

		if (isNaN(exerciseTimer) || isNaN(restTimer)) {
			Alert.alert("Invalid Input", "Please enter valid numbers.");
			return;
		}

		setExerciseTimer(Number(exerciseTimer));
		setRestTimer(Number(restTimer));

		router.replace("/(tabs)/");
		alert("Timers Updated");
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<Text style={styles.title}>Settings</Text>

				{/* Exercise Timer Input */}
				<TimerInput
					label="Exercise Timer (seconds):"
					value={exerciseTimer}
					onChangeText={setExerciseTimer}
				/>

				{/* Rest Timer Input */}
				<TimerInput
					label="Rest Timer (seconds):"
					value={restTimer}
					onChangeText={setRestTimer}
				/>

				{/* Save Button */}
				<SaveButton onPress={handleSave} />

				{/* About Us Section */}
				<AboutUs />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#fff",
	},
	scrollContainer: {
		flex: 1,
		padding: 16,
		justifyContent: "center",
		marginBottom: 35,
		marginTop: 10,
	},
	title: {
		fontSize: 30,
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginBottom: 8,
		textAlign: "center",
	},
});

export default Settings;
