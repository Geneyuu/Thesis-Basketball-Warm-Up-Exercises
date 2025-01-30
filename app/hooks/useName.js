import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useName() {
	const [name, setName] = useState("Asim"); // Default name

	// Load name from AsyncStorage when the hook initializes
	useEffect(() => {
		const loadName = async () => {
			try {
				const storedName = await AsyncStorage.getItem("userName");
				if (storedName) setName(storedName);
			} catch (error) {
				console.error("Failed to load name from AsyncStorage:", error);
			}
		};
		loadName();
	}, []);

	// Save name to AsyncStorage whenever it changes
	useEffect(() => {
		const saveName = async () => {
			try {
				await AsyncStorage.setItem("userName", name);
			} catch (error) {
				console.error("Failed to save name to AsyncStorage:", error);
			}
		};
		saveName();
	}, [name]);

	return [name, setName];
}
