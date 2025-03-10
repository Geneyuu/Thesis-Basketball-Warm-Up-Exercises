import React, { useContext, useState } from "react";
import {
	View,
	Alert,
	SafeAreaView,
	ScrollView,
	StyleSheet,
} from "react-native";
import { Data } from "../../_layout";
import { useRouter } from "expo-router";
import ProfileInfo from "../Profile/components/ProfileInfo";
import NameInput from "../Profile/components/NameInput";
import SaveButton from "../Profile/components/SaveButton";

const Profile = () => {
	const { name, setName } = useContext(Data);
	const [newName, setNewName] = useState(name);
	const router = useRouter();

	// Limit the input to 8 characters
	const handleNameChange = (text) => {
		if (text.length <= 9) {
			setNewName(text);
		} else {
			Alert.alert(
				"Error",
				"The maximum number of characters allowed is 8."
			);
		}
	};

	const handleSave = () => {
		setName(newName);
		Alert.alert("Name Updated", `You set your name to: ${newName}!`);
		router.replace("/home");
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.container}>
					<ProfileInfo title="Profile" currentName={name} />

					<NameInput
						label="New Name:"
						value={newName}
						onChangeText={handleNameChange} // use the limiter here
					/>

					<SaveButton onPress={handleSave} />
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
		flexGrow: 1,
		justifyContent: "flex-start",
		padding: 16,
	},
	container: {
		backgroundColor: "#fff",
		display: "flex",
		flex: 1,
		justifyContent: "center",
		marginBottom: 100,
		padding: 20,
	},
});

export default Profile;
