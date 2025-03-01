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

	const handleSave = () => {
		setName(newName);
		Alert.alert("Name Updated", `You set your name to: ${newName}!`);
		router.replace("/home");
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.container}>
					{/* Display current name and title */}
					<ProfileInfo title="Profile" currentName={name} />

					{/* Input to change name */}
					<NameInput
						label="New Name:"
						value={newName}
						onChangeText={setNewName}
					/>
					{/* Save button */}
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
	},
});

export default Profile;
