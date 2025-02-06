import React, { useContext, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Alert,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { Data } from "../../_layout"; // Import the context
import { useRouter } from "expo-router"; // Import router

const Profile = () => {
	const { name, setName } = useContext(Data); // Access name and setName
	const [newName, setNewName] = useState(name);
	const router = useRouter(); // Initialize router

	const handleSave = () => {
		// Save and then redirect to home
		setName(newName);
		Alert.alert("Name Updated", `You set your name to: ${newName}!`);
		router.replace("/home");
	};
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.container}>
					<Text style={styles.title}>Profile</Text>
					<Text style={styles.label}>Current Name:</Text>
					<Text style={styles.value}>{name}</Text>

					{/* Input to Change Name */}
					<Text style={styles.label}>New Name:</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter new name"
						value={newName}
						onChangeText={(text) => setNewName(text)} // Update name in context
					/>

					{/* Save Button */}
					<TouchableOpacity
						style={styles.saveButton}
						onPress={handleSave}
					>
						<Text style={styles.saveButtonText}>Save Profile</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#f9f9f9",
	},
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "flex-start",
		padding: 16,
	},
	container: {
		backgroundColor: "#f9f9f9",
		display: "flex",
		flex: 1,
		justifyContent: "center",
		marginBottom: 100,
	},
	title: {
		fontSize: 30,
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginBottom: 24,
		textAlign: "center",
	},
	label: {
		fontSize: 18,
		fontFamily: "Karla-Regular",
		color: "#161616",
		marginBottom: 8,
	},
	value: {
		fontSize: 20,
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginBottom: 16,
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 8,
		fontSize: 16,
		fontFamily: "Karla-Regular",
		marginBottom: 24,
	},
	saveButton: {
		backgroundColor: "black",
		paddingVertical: 12,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 16,
	},
	saveButtonText: {
		color: "#fff",
		fontSize: 18,
		fontFamily: "Karla-Bold",
	},
});

export default Profile;
