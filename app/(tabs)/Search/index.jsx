import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const exercises = [
	{
		id: "arm-stretch-left-arm",
		name: "Arm Stretch (Left Arm)",
		image: require("../../../assets/images/stretchingpreview.png"),
	},
	{
		id: "arm-stretch-right-arm",
		name: "Arm Stretch (Right Arm)",
		image: require("../../../assets/images/withballpreview.png"),
	},
	{
		id: "arm-circles",
		name: "Arm Circles",
		image: require("../../../assets/images/inplacepreview.png"),
	},
	{
		id: "shoulder-rolls",
		name: "Shoulder Rolls",
		image: require("../../../assets/images/wholebodypreview.png"),
	},
	{
		id: "neck-tilts",
		name: "Neck Tilts",
		image: require("../../../assets/images/withballpreview.png"),
	},
	{
		id: "leg-stretch-left-leg",
		name: "Leg Stretch (Left Leg)",
		image: require("../../../assets/images/withballpreview.png"),
	},
	{
		id: "leg-stretch-right-leg",
		name: "Leg Stretch (Right Leg)",
		image: require("../../../assets/images/withballpreview.png"),
	},
	{
		id: "toe-touches",
		name: "Toe Touches",
		image: require("../../../assets/images/withballpreview.png"),
	},
	{
		id: "side-stretches",
		name: "Side Stretches",
		image: require("../../../assets/images/withballpreview.png"),
	},
	{
		id: "lunges",
		name: "Lunges",
		image: require("../../../assets/images/withballpreview.png"),
	},
].sort((a, b) => a.name.localeCompare(b.name));

const Search = () => {
	const [query, setQuery] = useState("");
	const [filtered, setFiltered] = useState(exercises);
	const [disabled, setDisabled] = useState(false);
	const router = useRouter();

	const handleSearch = (text) => {
		setQuery(text);
		setFiltered(
			text
				? exercises.filter((ex) =>
						ex.name.toLowerCase().includes(text.toLowerCase())
				  )
				: exercises
		);
	};

	const handlePress = (id) => {
		if (disabled) return; // If already disabled, stop the function
		setDisabled(true); // Prevent further taps
		router.push(`/Search/${id}`); // Navigate to the selected exercise
		setQuery(""); // Clear search input
		setFiltered(exercises); // Reset exercise list
		// Re-enable button after 1.3 seconds
		setTimeout(() => setDisabled(false), 1300);
	};

	return (
		<View style={styles.container}>
			<View style={styles.searchBarContainer}>
				<Ionicons
					name="search"
					size={24}
					color="#161616"
					style={styles.searchIcon}
				/>
				<TextInput
					style={styles.searchBar}
					placeholder="Search exercises..."
					placeholderTextColor="#888"
					value={query}
					onChangeText={handleSearch}
				/>
			</View>

			<FlatList
				data={filtered}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.exerciseItem}
						onPress={() => handlePress(item.id)}
						disabled={disabled}
					>
						<Image
							source={item.image}
							style={styles.exerciseImage}
						/>
						<Text style={styles.exerciseText}>{item.name}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 15, backgroundColor: "#ffff" },
	searchBarContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 10,
		marginBottom: 20,
		marginTop: 20,
	},
	searchIcon: { marginRight: 10 },
	searchBar: {
		flex: 1,
		color: "#161616",
		fontSize: 18,
		fontFamily: "Karla-Regular",
	},
	exerciseItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 10,
		marginInline: 18,
		marginBottom: 12,
		borderRadius: 10,
		borderWidth: 1,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	exerciseImage: { width: 70, height: 70, borderRadius: 10, marginRight: 15 },
	exerciseText: {
		fontSize: 18,
		color: "#161616",
		fontWeight: "600",
		fontFamily: "Karla-Regular",
	},
});

export default Search;
