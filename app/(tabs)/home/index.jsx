import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Data } from "../../_layout";

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

const LogoSection = () => (
	<View style={styles.logoContainer}>
		<Text style={styles.headerText}>WarmUps</Text>
	</View>
);

const ProfileSection = () => {
	const { name } = useContext(Data);
	const router = useRouter();

	return (
		<View style={styles.profileSection}>
			<View>
				<Text style={styles.greetingText}>
					Hello, <Text style={styles.greetingName}>{name}</Text>
				</Text>
				<Text style={styles.subGreetingText}>Cvsu Student</Text>
			</View>
			<TouchableOpacity
				style={styles.profileContainer}
				onPress={() => router.push("/Profile")}
			>
				<Image
					source={require("../../../assets/images/default-logo.webp")}
					style={styles.profileImage}
				/>
			</TouchableOpacity>
		</View>
	);
};

const SubHeader = () => (
	<Text style={styles.subHeaderText}>
		Basketball Warm-Up Exercises, exclusive for Cavite State University.
	</Text>
);

const Header = () => (
	<View style={styles.header}>
		<View style={styles.headerRow}>
			<LogoSection />
			<ProfileSection />
		</View>
		<SubHeader />
	</View>
);

const FeaturedExercises = () => (
	<View style={styles.featuredContainer}>
		<Text style={styles.sectionTitle}>Featured Exercises</Text>
		<View style={styles.featuredBox}>
			<Image
				source={require("../../../assets/images/withballpreview.png")}
				style={styles.featuredImage}
			/>
		</View>
	</View>
);

const CategoryCard = ({ title, imageUri, navigationPath }) => {
	const router = useRouter();

	return (
		<TouchableOpacity
			style={styles.categoryCard}
			onPress={() => router.push(navigationPath)}
		>
			<Image style={styles.cardImage} source={imageUri} />
			<Text style={styles.cardText}>{title}</Text>
		</TouchableOpacity>
	);
};

const Categories = () => (
	<View style={styles.categoriesContainer}>
		<Text style={styles.sectionTitle}>Categories</Text>
		<ScrollView
			contentContainerStyle={styles.categoriesGrid}
			showsVerticalScrollIndicator={false}
		>
			<CategoryCard
				title="Whole Body (Dynamic)"
				imageUri={require("../../../assets/images/wholebodypreview.png")}
				navigationPath="home/whole-body/details"
			/>
			<CategoryCard
				title="In Place"
				imageUri={require("../../../assets/images/inplacepreview.png")}
				navigationPath="home/in-place/inplace"
			/>
			<CategoryCard
				title="With Ball"
				imageUri={require("../../../assets/images/withballpreview.png")}
				navigationPath="home/with-ball/withball"
			/>
			<CategoryCard
				title="Stretching"
				imageUri={require("../../../assets/images/stretchingpreview.png")}
				navigationPath="home/stretching/stretching"
			/>
		</ScrollView>
	</View>
);

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	logoContainer: { flexDirection: "row", alignItems: "center" },
	headerText: { fontSize: 40, fontFamily: "Oswald-Bold", color: "#161616" },
	profileSection: { flexDirection: "row", alignItems: "center" },
	greetingText: { fontSize: 14, color: "#000", fontFamily: "Karla-Regular" },
	greetingName: {
		color: "#161616",
		fontFamily: "Oswald-Bold",
		fontSize: 16,
		textTransform: "uppercase",
	},
	subGreetingText: {
		fontSize: 12,
		fontFamily: "Karla-ExtraLight",
		color: "#161616",
		marginTop: 2,
		textAlign: "right",
	},
	profileContainer: {
		marginLeft: 10,
		width: 60,
		height: 60,
		borderRadius: 10,
		overflow: "hidden",
	},
	profileImage: { width: "100%", height: "100%", resizeMode: "contain" },
	subHeaderText: {
		marginTop: 0,
		fontSize: 10,
		color: "#000",
		fontFamily: "Karla-ExtraLight",
		width: "50%",
	},
	header: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		backgroundColor: "#fff",
		borderBottomWidth: 3,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	featuredContainer: { marginBottom: 0, padding: 20, marginTop: 15 },
	sectionTitle: {
		fontSize: 20,
		marginBottom: 5,
		fontFamily: "Karla-Bold",
		color: "#000",
	},
	featuredBox: {
		marginTop: 5,
		height: 175,
		borderRadius: 10,
		overflow: "hidden",
		marginBottom: -18,
	},
	featuredImage: { width: "100%", height: "100%", resizeMode: "cover" },
	categoryCard: { width: "47%", marginBottom: 10 },
	cardImage: { width: "100%", height: 120, borderRadius: 10 },
	cardText: {
		textAlign: "center",
		paddingTop: 15,
		fontFamily: "Karla-Regular",
		color: "#000",
		fontSize: 16,
	},
	categoriesContainer: { flex: 1, padding: 20 },
	categoriesGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
});

export default Home;
