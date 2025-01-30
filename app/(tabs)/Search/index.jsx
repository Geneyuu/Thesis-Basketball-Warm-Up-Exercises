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

// Exercise data: This is the list of exercises
const exercisesData = [
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
];

// Main App Component
const Search = () => {
	// State to track the search input and filtered exercises
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredExercises, setFilteredExercises] = useState(exercisesData);
	const [disabled, setDisabled] = useState(false); // Prevents double taps
	const router = useRouter();

	// Function to filter exercises based on search input
	const filterExercises = (query) => {
		setSearchQuery(query); // Update the search query state
		if (query === "") {
			setFilteredExercises(exercisesData); // Show all exercises if query is empty
		} else {
			// Filter exercises that match the query
			const filtered = exercisesData.filter((exercise) =>
				exercise.name.toLowerCase().includes(query.toLowerCase())
			);
			setFilteredExercises(filtered);
		}
	};

	// Function to navigate to an exercise page
	const navigateToExercise = (exerciseId) => {
		if (disabled) return; // Disable navigation while already navigating
		setDisabled(true); // Prevent double tap
		router.push(`/Search/${exerciseId}`); // Navigate to the selected exercise
		setTimeout(() => setDisabled(false), 1300); // Re-enable after 1.3 seconds
	};

	// Render the search input and list of exercises
	return (
		<View style={styles.container}>
			{/* Search Bar */}
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
					value={searchQuery}
					onChangeText={(onChangeText) =>
						filterExercises(onChangeText)
					}
				/>
			</View>

			{/* Exercise List */}
			<FlatList
				data={filteredExercises} // List of exercises to display
				keyExtractor={(item) => item.id} // Unique key for each exercise
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.exerciseItem}
						onPress={() => navigateToExercise(item.id)}
						disabled={disabled} // Prevent double-tap
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

// 3. Styles for the components (unchanged from your original code)
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: "#ffff",
	},
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
	searchIcon: {
		marginRight: 10,
	},
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
	exerciseImage: {
		width: 70,
		height: 70,
		borderRadius: 10,
		marginRight: 15,
	},
	exerciseText: {
		fontSize: 18,
		color: "#161616",
		fontWeight: "600",
		fontFamily: "Karla-Regular",
	},
});

// pinagsama sama kona sa isang component para maaccess yung mga state, medyo magulo kapag hiwalay na components
export default Search;
