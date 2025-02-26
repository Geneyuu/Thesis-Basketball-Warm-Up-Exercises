import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useName() {
	const [name, setName] = useState("SetName"); // Default state

	useEffect(() => {
		const initializeName = async () => {
			try {
				const storedName = await AsyncStorage.getItem("userName");

				// Kapag wala pang laman, mag-set ng default sa storage
				if (!storedName) {
					await AsyncStorage.setItem("userName", "SetName");
				} else {
					setName(storedName); // Kung may laman na, gamitin iyon
				}
			} catch (error) {
				console.error(
					"Failed to initialize name in AsyncStorage:",
					error
				);
			}
		};

		initializeName();
	}, []);

	// eto eh kapag nadetect na yung state na name natin is nabago, magrurun tong effect nato tapos iseset nya yung localstorage sa bagong name na nabago.
	useEffect(() => {
		const saveName = async () => {
			try {
				await AsyncStorage.setItem("userName", name);
			} catch (error) {
				console.error("Failed to save name to AsyncStorage:", error);
			}
		};

		saveName();
	}, [name]); //irerendre nya tong state kapag nadetect nagbago yung value ng state na name, para maupdate nya rin yung value dun sa localstorage.

	return { name, setName }; // para madali maaccess pag ginamit ang useName since kapag tinawag mo ang useName eh magrereturn sya ng isang object na may dalawang properties.
}
