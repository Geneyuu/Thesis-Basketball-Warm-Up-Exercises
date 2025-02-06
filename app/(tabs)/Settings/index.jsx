import React, { useContext, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
	ScrollView,
	SafeAreaView,
	useWindowDimensions,
} from "react-native";
import { Data } from "./../../_layout"; // Import your context
import { Link, useRouter } from "expo-router"; // For navigation

const Settings = () => {
	const { width, height } = useWindowDimensions();

	const { exerciseTimer, setExerciseTimer, restTimer, setRestTimer } =
		useContext(Data); // Access context

	const [newExerciseTimer, setNewExerciseTimer] = useState(exerciseTimer); // Editable state for exercise timer
	const [newRestTimer, setNewRestTimer] = useState(restTimer); // Editable state for rest timer

	const router = useRouter();

	// Handle Save button click
	const handleSave = () => {
		// Validate if timers are valid numbers
		if (isNaN(newExerciseTimer) || isNaN(newRestTimer)) {
			Alert.alert(
				"Invalid Input",
				"Please enter valid numbers for the timers."
			);
			return;
		}

		// Update the timers in context
		setExerciseTimer(newExerciseTimer);
		setRestTimer(newRestTimer);

		// Navigate back to the home screen
		router.replace("/(tabs)/");

		// Alert the user that the timers have been updated
		alert("Timers Updated");
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<Text style={styles.title}>Settings</Text>

				{/* Exercise Timer Input */}
				<View style={styles.inputRow}>
					<Text style={styles.label}>Exercise Timer (seconds):</Text>
					<TextInput
						style={styles.input}
						value={String(newExerciseTimer)}
						onChangeText={setNewExerciseTimer}
						keyboardType="numeric"
					/>
				</View>

				{/* Rest Timer Input */}
				<View style={styles.inputRow}>
					<Text style={styles.label}>Rest Timer (seconds):</Text>
					<TextInput
						style={styles.input}
						value={String(newRestTimer)}
						onChangeText={setNewRestTimer}
						keyboardType="numeric"
					/>
				</View>

				{/* Save Button */}
				<TouchableOpacity
					style={styles.saveButton}
					onPress={handleSave}
				>
					<Text style={styles.saveButtonText}>Save Settings</Text>
				</TouchableOpacity>

				{/* About Us Section */}
				<View style={styles.aboutUs}>
					<Text style={styles.aboutTitle}>About Us</Text>
					<Text style={styles.aboutText}>Developed by:</Text>
					<Text style={styles.developerName}>Christian Bajao</Text>
					<Text style={styles.developerName}>Eugene Escario</Text>
					<Text style={styles.developerName}>Lennard Sabellano</Text>
					<Text style={styles.aboutText}>
						Email: yourname@example.com
					</Text>
					<Text style={styles.aboutText}>Version: 1.0.0</Text>
				</View>
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
	inputRow: {
		marginVertical: 12,
	},
	label: {
		fontSize: 18,
		fontFamily: "Karla-Regular",
		color: "#161616",
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 8,
		fontSize: 16,
		fontFamily: "Karla-Regular",
		marginTop: 8,
	},
	saveButton: {
		backgroundColor: "black",
		paddingVertical: 12,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	saveButtonText: {
		color: "#fff",
		fontSize: 18,
		fontFamily: "Karla-Bold",
	},
	aboutUs: {
		flex: 1,
		marginTop: 40,
		borderTopWidth: 1,
		borderTopColor: "#ccc",
		paddingTop: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	aboutTitle: {
		fontSize: 24,
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginBottom: 10,
		textAlign: "center",
	},
	aboutText: {
		fontSize: 16,
		fontFamily: "Karla-Regular",
		color: "#161616",
		textAlign: "center",
		marginBottom: 8,
	},
	developerName: {
		fontSize: 16,
		fontFamily: "Karla-Regular",
		color: "#161616",
		textAlign: "center",
		marginBottom: 4, // Slightly smaller spacing between names
	},
});

export default Settings;
