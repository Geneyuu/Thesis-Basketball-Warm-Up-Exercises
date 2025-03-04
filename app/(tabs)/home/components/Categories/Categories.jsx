import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CategoryCard from "./CategoryCard";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const categoryData = [
	{
		title: "Lower Body Mobility & Activation",
		imageUri: require("./../../../../../assets/images/wholebodypreview.png"),
		navigationPath: "home/whole-body/details",
	},
	{
		title: "Upper Body & Core Activation",
		imageUri: require("./../../../../../assets/images/inplacepreview.png"),
		navigationPath: "home/in-place/inplace",
	},
	{
		title: "Cardio & Full-Body Activation",
		imageUri: require("./../../../../../assets/images/withballpreview.png"),
		navigationPath: "home/with-ball/withball",
	},
	{
		title: "Basketball-Specific Movements",
		imageUri: require("./../../../../../assets/images/stretchingpreview.png"),
		navigationPath: "home/stretching/stretching",
	},
];

// main component for category
const Categories = () => (
	<View style={styles.categoriesContainer}>
		<Text style={styles.sectionTitle}>Categories</Text>
		<ScrollView
			contentContainerStyle={styles.categoriesGrid}
			showsVerticalScrollIndicator={false}
		>
			{categoryData.map((category, index) => (
				<CategoryCard key={index} {...category} /> // child component CategoryCard
			))}
		</ScrollView>
	</View>
);

const styles = StyleSheet.create({
	categoriesContainer: {
		width: wp(100),
		flex: 1,
		paddingBlock: 10,
		paddingInline: 20,
	},
	categoriesGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 6,
		justifyContent: "space-between",
		paddingBottom: hp(2),
	},
	sectionTitle: {
		fontSize: 20,
		marginBottom: 5,
		fontFamily: "Karla-Bold",
		color: "#000",
	},
});

export default Categories;
