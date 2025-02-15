import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useFocusEffect, useRouter } from "expo-router";
import { Data } from "../../_layout";
import Carousel from "react-native-snap-carousel";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const categoryData = [
	{
		title: "Whole Body (Dynamic)",
		imageUri: require("../../../assets/images/wholebodypreview.png"),
		navigationPath: "home/whole-body/details",
	},
	{
		title: "In Place",
		imageUri: require("../../../assets/images/inplacepreview.png"),
		navigationPath: "home/in-place/inplace",
	},
	{
		title: "With Ball",
		imageUri: require("../../../assets/images/withballpreview.png"),
		navigationPath: "home/with-ball/withball",
	},
	{
		title: "Stretching",
		imageUri: require("../../../assets/images/stretchingpreview.png"),
		navigationPath: "home/stretching/stretching",
	},
];

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

const sliderMedia = [
	{
		type: "video",
		source: require("../../../assets/videos/video.mp4"),
	},
	{
		type: "video",
		source: require("../../../assets/videos/pushup.mp4"),
	},
	{
		type: "video",
		source: require("../../../assets/videos/video.mp4"),
	},
];

const FeaturedExercises = () => (
	<View style={styles.featuredContainer}>
		<Text style={styles.FeatureExerciseTitle}>Featured Exercises</Text>
		<ImageSlider />
	</View>
);

const ImageSlider = () => {
	const [focusedIndex, setFocusedIndex] = useState(0); // Track the focused index

	return (
		<Carousel
			data={sliderMedia}
			enableMomentum={true}
			renderItem={({ item, index }) => (
				<ItemCard item={item} isFocused={focusedIndex === index} />
			)}
			sliderWidth={wp(200)}
			itemWidth={wp(85)}
			inactiveSlideScale={0.85}
			inactiveSlideOpacity={0.9}
			firstItem={0}
			snapToAlignment="center"
			slideStyle={{ display: "flex", alignItems: "center" }}
			autoplay={true}
			autoplayInterval={1000}
			loop
			onSnapToItem={(index) => {
				setFocusedIndex(index);
			}}
		/>
	);
};

const ItemCard = ({ item, isFocused }) => {
	const [isLoading, setIsLoading] = useState(true);

	if (item.type === "video") {
		const player = useVideoPlayer(item.source, (playerInstance) => {
			playerInstance.loop = true;
			playerInstance.muted = true; // Default: Mute
		});

		useEffect(() => {
			if (player) {
				setTimeout(() => {
					player.play();
					setIsLoading(false);
				}, 500);
			}
		}, [player]);

		useEffect(() => {
			if (player) {
				player.muted = !isFocused;
			}
		}, [isFocused, player]);

		useFocusEffect(
			React.useCallback(() => {
				player.play();

				return () => {
					if (player) {
						player.muted = true; // Ensure mute on unmount
						player.pause();
					}
				};
			}, [player])
		);

		if (isLoading) {
			return (
				<View>
					<Text>Loading...</Text>
				</View>
			);
		}

		return (
			<View style={styles.videoContainer}>
				<VideoView
					player={player}
					style={{ width: "100%", height: "100%" }}
					nativeControls={false}
				/>
			</View>
		);
	}

	return (
		<View style={styles.imageContainer}>
			<Image source={item.source} style={styles.image} />
		</View>
	);
};

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
			{categoryData.map((category, index) => (
				<CategoryCard key={index} {...category} />
			))}
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
	featuredContainer: {
		width: "100%",
		alignItems: "center",
		paddingBlock: 10,
		marginTop: 50,
		position: "relative",
	},
	FeatureExerciseTitle: {
		position: "absolute",
		left: 25,
		top: -23,
		fontFamily: "Karla-Bold",
		fontSize: 20,
	},
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
	categoryCard: {
		width: "47%", // Laging 2 columns
		alignItems: "center",
	},
	cardImage: {
		width: "100%",
		height: wp(30), // Responsive height
		borderRadius: 10,
		marginTop: 5,
	},
	cardText: {
		marginTop: 5,
		fontSize: wp(3.5), // Responsive text size
		textAlign: "center",
		fontFamily: "Karla-Regular",
		color: "#000",
	},
	categoriesContainer: {
		flex: 1,
		paddingBlock: 10,
		marginTop: 10,
		paddingInline: 20,
	},
	categoriesGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		paddingBottom: hp(2), // Para may extra space sa baba
	},
	videoContainer: {
		width: "105%",
		height: hp(25),
		borderRadius: 25,
		overflow: "hidden",
	},
	imageContainer: {
		width: "100%",
		height: hp(25),
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 25,
		resizeMode: "contain",
	},
});

export default Home;
