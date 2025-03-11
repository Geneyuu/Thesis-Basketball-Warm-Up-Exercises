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
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
		padding: wp("4%"), // equivalent to 16 on a base width
	},
	container: {
		backgroundColor: "#fff",
		display: "flex",
		flex: 1,
		justifyContent: "center",
		marginBottom: hp("12%"), // equivalent to 100 on a base height
		padding: wp("5%"), // equivalent to 20 on a base width
	},
});

export default Profile;
