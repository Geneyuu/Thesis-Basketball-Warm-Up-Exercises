import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ItemCard from "../ItemCard/ItemCard";

const sliderMedia = [
	{
		type: "video",
		source: require("../../../../../assets/videos/pushup.mp4"),
	},
	{
		type: "video",
		source: require("../../../../../assets/videos/video.mp4"),
	},
	{
		type: "image",
		source: require("../../../../../assets/images/wholebodypreview.png"),
	},
];

const ImageSlider = () => {
	const [focusedIndex, setFocusedIndex] = useState(0);

	return (
		<Carousel
			data={sliderMedia}
			enableMomentum={true}
			renderItem={({ item, index }) => (
				<ItemCard item={item} isFocused={focusedIndex === index} />
			)}
			sliderWidth={wp(200)}
			itemWidth={wp(79)}
			inactiveSlideScale={0.85}
			inactiveSlideOpacity={0.9}
			firstItem={0}
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

const styles = StyleSheet.create({
	videoContainer: {
		width: wp(83),
		height: hp(24),
		borderRadius: 25,
		overflow: "hidden",
	},
});

export default ImageSlider;
