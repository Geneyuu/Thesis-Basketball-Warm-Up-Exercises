import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header/Header";
import FeaturedExercises from "./components/FeaturedExercises/FeaturedExercises";
import Categories from "./components/Categories/Categories";

const Home = () => {
	return (
		<View style={styles.container}>
			<View style={styles.scrollViewContainer}></View>
			<Header />
			<FeaturedExercises />
			<Categories />
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
});

export default Home;
