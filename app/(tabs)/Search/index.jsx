import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { exercises } from "../../exercisespaths/exercises";
import SearchBar from "../Search/components/SearchBar";
import ExerciseList from "../Search/components/ExerciseList";

const sortedExercises = [...exercises].sort((a, b) =>
	a.name.localeCompare(b.name)
);

const Search = () => {
	const [query, setQuery] = useState("");
	const [filtered, setFiltered] = useState(sortedExercises);
	const [disabled, setDisabled] = useState(false);
	const router = useRouter();

	const handleSearch = (text) => {
		setQuery(text);
		setFiltered(
			text
				? sortedExercises.filter((ex) =>
						ex.name.toLowerCase().includes(text.toLowerCase())
				  )
				: sortedExercises
		);
	};

	const handlePress = (id) => {
		if (disabled) return;
		setDisabled(true);
		router.push(`/Search/${id}`);
		setQuery("");
		setFiltered(sortedExercises);
		setTimeout(() => setDisabled(false), 1300);
	};

	return (
		<View style={styles.container}>
			<SearchBar query={query} onChangeText={handleSearch} />
			<ExerciseList
				data={filtered}
				onPressItem={handlePress}
				disabled={disabled}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 15, backgroundColor: "#ffff" },
});

export default Search;
