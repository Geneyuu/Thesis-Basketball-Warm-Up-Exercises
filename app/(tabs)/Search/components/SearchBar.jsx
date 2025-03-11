import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SearchBar = ({ query, onChangeText }) => {
	return (
		<View style={styles.searchBarContainer}>
			<Ionicons
				name="search"
				size={wp("5.5%")}
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
		paddingVertical: hp("1.2%"),
		paddingHorizontal: wp("4%"),
		borderRadius: wp("3%"),
		marginBottom: hp("2.5%"),
		marginTop: hp("2.5%"),
	},
	searchIcon: {
		marginRight: wp("3%"),
	},
	searchBar: {
		flex: 1,
		color: "#161616",
		fontSize: wp("4.2%"),
		fontFamily: "Roboto-Regular",
	},
});

export default SearchBar;
