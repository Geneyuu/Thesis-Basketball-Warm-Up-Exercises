import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ query, onChangeText }) => {
	return (
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
				onChangeText={onChangeText}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
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
});

export default SearchBar;
