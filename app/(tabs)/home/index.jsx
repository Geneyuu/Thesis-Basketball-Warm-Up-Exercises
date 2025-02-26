import React, { useContext, useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	AppState,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Data } from "../../_layout"; // path for the global state datas.
import Carousel from "react-native-snap-carousel"; // library para  sa carousel functionality;
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"; // eto trial lang to for responsiveness medyo di ko magets yung pagreresponsive.
import { Video } from "expo-av"; // library din para magamit yung expo-av nila for video functionality.
import { ActivityIndicator } from "react-native"; // eto library for built in activityIndicator or yung loading na naikot-ikot.

// dynamic data for the categories
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

// dynamic data for the slider carousel videos
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
		type: "image",
		source: require("../../../assets/images/stretchingpreview.png"),
	},
];

// Parent Component
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

const SubHeader = () => (
	<Text style={styles.subHeaderText}>
		Basketball Warm-Up Exercises, exclusive for Cavite State University.
	</Text>
);

// component for header to..
const Header = () => (
	<View style={styles.header}>
		<View style={styles.headerRow}>
			<LogoSection />
			<ProfileSection />
		</View>
		<SubHeader />
	</View>
);

// featuredExercises component to...
const FeaturedExercises = () => (
	<View style={styles.featuredContainer}>
		<Text style={styles.FeatureExerciseTitle}>Featured Exercises</Text>
		<ImageSlider />
	</View>
);

// Categories component to...
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

// component to na nasaloob ng categories para sa each type of exercises category ng exercise.
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

//mini child component ito sa header for the logo nasa loon to ng header component
const LogoSection = () => (
	<View style={styles.logoContainer}>
		<Text style={styles.headerText}>WarmUps</Text>
	</View>
);

//mini child component ito sa header for the Profilke nasa loob to ng header component
const ProfileSection = () => {
	const { name } = useContext(Data); // para ma-access yung global na mga states or memory na need at name lang kinuha natin.
	const router = useRouter(); // para magamit yung router na built in function sinet ko lang sa variable name na router para madaling maintindihan.

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
					source={require("../../../assets/images/cvsulogo.png")}
					style={styles.profileImage}
				/>
			</TouchableOpacity>
		</View>
	);
};

// image Slider component to para sa carousel slider functionality...
const ImageSlider = () => {
	const [focusedIndex, setFocusedIndex] = useState(0); // naglagay ako ng state para may memory to track kung ano yung nakafocus na slider.

	return (
		<Carousel
			data={sliderMedia} // nilagay ko lang yung dynamic na data ng sliderMedia.
			enableMomentum={true}
			renderItem={({ item, index }) => (
				<ItemCard item={item} isFocused={focusedIndex === index} /> // naglagay ako ng conditional props true or false kung nakafocused ba yung item or not. so magrereturn to ng mga index na may true at mga false.
			)} // eto para irender na at ipakita sa screen, for each item ipapakita nya yung mga Item Card
			sliderWidth={wp(200)} // eto styliong lang tas tinry ko mag responsive styling kaso di ko pa makuha timpla.
			itemWidth={wp(79)} // eto styliong lang tas tinry ko mag responsive styling kaso di ko pa makuha timpla.
			inactiveSlideScale={0.85}
			inactiveSlideOpacity={0.9}
			firstItem={0} // eto gusto kong unang ipakita or nakafocus is first index 0 na itemcard;
			snapToAlignment="center"
			slideStyle={{ display: "flex", alignItems: "center" }}
			autoplay={true}
			autoplayInterval={5000}
			onSnapToItem={(index) => {
				setFocusedIndex(index);
			}}
		/>
	);
};

const ItemCard = ({ item, isFocused }) => {
	// inaccess ko dito yung isfocus saka item/eachvideocardyan.
	const videoRef = useRef(null); // gumamit na ako dito ng useRef hooks, para icontrol natin yung pagplay or video or pause para di na need ng rerender ng component na ItemCard. tapos inasign ko lang na magigign value neto is yung video element para may control na sa pause/play ng video.
	const [isLoaded, setIsLoaded] = useState(false); // state memory to para itrack kung need nabang iclose or hindi pa yung activity indicator na loading.

	// function naman to kapag yung sa video element na onload is true na magrurun to
	const handleLoad = async () => {
		setIsLoaded(true); // habang di pa tapos delay neto, magshoshow parin yung loading na activity indicator bago nya i-true.
	};

	// sa initial/first rendering ng component na item card ichecheck nya kung yung videoRef.current is may value na since kapag ang isloaded ay true minamount na yung video element. pag true, automatic play na yung mga video, pero ayaw natin na mangyari yung lahat ng video is nagpeplay kaya gumamit na ako ng useFocusEffect.
	useEffect(() => {
		const playVideo = async () => {
			if (videoRef.current && isLoaded) {
				await videoRef.current.playAsync();
			}
		};
		playVideo();
	}, [isLoaded]);

	// gumamit tayo dito ng focusEffect + appstate para madetect natin yung behavior ng user, kunwari, ni click ng user yung home button ng android phone nya, so doon maiidentify natin kung anong magigign response ng app pag ganon ang sitwasyon.
	useFocusEffect(
		React.useCallback(() => {
			// gumamit tayo ng react callback dito para sigurado na hindi magbabago ang function memory, maliban kung may nagbago sa dependencies. Para maavoid din yung extra event listener sa handleaAppState.
			const handleAppStateChange = async (appStatus) => {
				// eto ay para naman sa behavior ng user kung inactive ba or active sa mismong app.
				if (appStatus === "active" && isFocused && videoRef.current) {
					await videoRef.current.playAsync(); // kung active at nakafocused === true, magpeplay yung video
				} else if (videoRef.current) {
					// else nakapause lang ang video
					await videoRef.current.pauseAsync();
				}
			};

			// dito ang detector kung ang user ba ay inactive or active at automatik na ang parameter na appstatus ay magkakavalue ng its either 'active', 'inactive'.
			const appStateSubscription = AppState.addEventListener(
				"change",
				handleAppStateChange
			);

			// etong part na to is behavior lang mismo sa loob ng application like example lumipat tayo ng ibang tabs mag eexecute tong code nato.
			const manageVideoPlayback = async () => {
				if (videoRef.current) {
					if (isFocused && isLoaded) {
						await videoRef.current.playAsync();
						await videoRef.current.setIsMutedAsync(false);
					} else {
						await videoRef.current.pauseAsync();
					}
				}
			};

			manageVideoPlayback();

			// Cleanup function ang ginagamit para maiwasan ang memory leaks at duplicate event listeners kapag nag-unfocus ang component.
			return () => {
				appStateSubscription.remove();
				if (videoRef.current) {
					videoRef.current.pauseAsync();
				}
			};
		}, [isFocused, isLoaded]) // dependecies para magrerun yung useFocusEffect kung sakaling ano man sa dalawang to ang magbago. kasi dyan tayo nakadepende sa mga memory na iyan kung paano natin gustong mangyari sa component nato.
	);

	return (
		<View style={styles.videoContainer}>
			{item.type === "video" ? ( // nag conditional rendering ako dito para incase na image lang ilalagay natin, is compatible parin sya.
				<>
					{!isLoaded && (
						<ActivityIndicator size="large" color="green" />
					)}
					<Video // video element natin to
						ref={videoRef}
						source={item.source}
						style={{
							width: "100%",
							height: "100%",
							opacity: isLoaded ? 1 : 0,
						}}
						shouldPlay={true}
						isMuted={true}
						resizeMode="contain"
						isLooping
						onLoad={handleLoad}
						onError={(error) =>
							console.log("Error loading video:", error)
						}
					/>
				</>
			) : item.type === "image" ? (
				<Image
					source={item.source}
					style={{
						width: "100%",
						height: "100%",
					}}
					resizeMode="contain"
				/>
			) : (
				<Text>No media available</Text>
			)}
		</View>
	);
};

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
		width: wp(40),
		height: hp(12.5), // Responsive height
		borderRadius: 10,
		marginTop: 10,
	},
	cardText: {
		marginTop: 5,
		fontSize: wp(3.5), // Responsive text size
		textAlign: "center",
		fontFamily: "Karla-Regular",
		color: "#000",
	},
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
		paddingBottom: hp(2), // Para may extra space sa baba
	},
	videoContainer: {
		width: wp(83),
		height: hp(24),
		borderRadius: 25,
		overflow: "hidden",
	},
	imageContainer: {
		width: wp(100),
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
