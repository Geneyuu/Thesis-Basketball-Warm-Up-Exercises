import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	ScrollView,
	Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Data } from "@/app/_layout";

export default function Settings() {
	const { exerciseList, setExerciseList, resTimer, setResTimer } =
		useContext(Data);

	const [selectedExercise, setSelectedExercise] = useState("");
	const [duration, setDuration] = useState("");
	const [repetitions, setRepetitions] = useState("");

	useEffect(() => {
		if (selectedExercise) {
			const exercise = exerciseList.find(
				(eachExercise) => eachExercise.id === selectedExercise
			);

			if (exercise) {
				setDuration(
					exercise.duration ? exercise.duration.toString() : ""
				);
				setRepetitions(
					exercise.repetitions !== null
						? exercise.repetitions.toString()
						: ""
				);
			}
		} else {
			setDuration("");
			setRepetitions("");
		}
	}, [selectedExercise]);

	const handleSaveSettings = () => {
		if (!selectedExercise) {
			Alert.alert("Error", "Please select an exercise to edit");

			return;
		}

		const updatedExercise = exerciseList.map((selectedEx) =>
			selectedEx.id === selectedExercise
				? {
						...selectedEx,
						duration: duration
							? Number(duration)
							: selectedEx.duration,
						repetitions: repetitions
							? Number(repetitions)
							: selectedEx.repetitions,
				  }
				: selectedEx
		);

		setExerciseList(updatedExercise);

		Alert.alert("Success", "Exercise settings updated successfully!");
	};

	return (
		<ScrollView
			style={styles.container}
			keyboardShouldPersistTaps="handled"
		>
			<Text style={styles.title}>Exercise Settings</Text>

			{/* Exercise Selection */}
			<Text style={styles.label}>Select Exercise:</Text>
			<Picker
				mode="dropdown"
				style={styles.picker}
				selectedValue={selectedExercise}
				onValueChange={(itemValue) => {
					setSelectedExercise(itemValue);
					console.log("selected exercise", itemValue);
				}}
			>
				<Picker.Item
					label="Select an exercise..."
					value=""
					color="black"
				/>
				{exerciseList.map((eachExercise) => (
					<Picker.Item
						key={eachExercise.id}
						label={eachExercise.name}
						value={eachExercise.id}
						color="green"
					/>
				))}
			</Picker>

			{/* Duration */}
			<Text style={styles.label}>Duration (seconds):</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter duration"
				keyboardType="numeric"
				value={duration}
				placeholderTextColor="#888"
				onChangeText={(input) => setDuration(input)}
			/>

			{/* Repetitions */}
			<Text style={styles.label}>Repetitions:</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter repetitions"
				placeholderTextColor="#888"
				keyboardType="numeric"
				value={repetitions}
				onChangeText={(input) => setRepetitions(input)}
			/>

			{/* Save Button */}
			<TouchableOpacity
				style={styles.button}
				onPress={handleSaveSettings}
			>
				<Text style={styles.buttonText}>Save Settings</Text>
			</TouchableOpacity>

			{/* Rest Timer */}
			<Text style={styles.label}>Global Rest Timer (seconds):</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter rest time"
				placeholderTextColor="#888"
				keyboardType="numeric"
			/>
			<TouchableOpacity style={styles.button} onPress={() => {}}>
				<Text style={styles.buttonText}>Save Rest Timer</Text>
			</TouchableOpacity>

			{/* About Us Section */}
			<View style={styles.aboutUsContainer}>
				<Text style={styles.aboutTitle}>About Us</Text>

				<View style={styles.developerContainer}>
					<Text style={styles.developerName}>Juan Dela Cruz</Text>
					<Text style={styles.developerEmail}>
						juandelacruz@email.com
					</Text>
				</View>

				<View style={styles.developerContainer}>
					<Text style={styles.developerName}>Maria Santos</Text>
					<Text style={styles.developerEmail}>
						mariasantos@email.com
					</Text>
				</View>

				<View style={styles.developerContainer}>
					<Text style={styles.developerName}>Pedro Reyes</Text>
					<Text style={styles.developerEmail}>
						pedroreyes@email.com
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		fontFamily: "Karla-Bold",
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
		fontFamily: "Karla-Regular",
	},
	picker: {
		width: "100%",
		alignSelf: "center",
		...Platform.select({
			ios: {
				borderRadius: 5,
				marginTop: -60,
				backgroundColor: "transparent",
				fontFamily: "Karla-Regular",
			},
			android: {},
			web: {
				height: 60,
				fontFamily: "Karla-Regular",
				fontSize: 16,
			},
		}),
	},
	input: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		marginBottom: 15,
		backgroundColor: "#fff",
		fontFamily: "Karla-Regular",
	},
	button: {
		backgroundColor: "black",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
		marginVertical: 10,
		marginBottom: 50,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontFamily: "Karla-Bold",
	},

	// About Us Section Styles
	aboutUsContainer: {
		...Platform.select({
			ios: {
				marginTop: 50,
			},
			android: {},
			web: {},
		}),
		padding: 20,
		borderRadius: 10,
		backgroundColor: "none",
	},
	aboutTitle: {
		fontSize: 26,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
		fontFamily: "Karla-Regular",
	},
	developerContainer: {
		marginBottom: 15,
		alignItems: "center",
	},
	developerName: {
		fontSize: 16,
		fontFamily: "Karla-Regular",
	},
	developerEmail: {
		fontSize: 14,
		color: "#555",
		fontFamily: "Karla-Regular",
	},
});
