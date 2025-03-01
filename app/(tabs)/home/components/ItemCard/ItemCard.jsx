import React, { useRef, useState, useEffect } from "react";
import { View, ActivityIndicator, Image, Text, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { useFocusEffect } from "expo-router";
import { AppState } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ItemCard = ({ item, isFocused }) => {
	const videoRef = useRef(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const handleLoad = () => {
		setIsLoaded(true);
	};

	useEffect(() => {
		const playVideo = () => {
			if (videoRef.current && isLoaded) {
				videoRef.current
					.playAsync()
					.catch((error) =>
						console.log("Error playing video:", error)
					);
			}
		};
		playVideo();
	}, [isLoaded]);

	useFocusEffect(
		React.useCallback(() => {
			const handleAppStateChange = (appStatus) => {
				if (appStatus === "active" && isFocused && videoRef.current) {
					videoRef.current
						.playAsync()
						.catch((error) =>
							console.log("Error resuming video:", error)
						);
				} else if (videoRef.current) {
					videoRef.current
						.pauseAsync()
						.catch((error) =>
							console.log("Error pausing video:", error)
						);
				}
			};

			const appStateSubscription = AppState.addEventListener(
				"change",
				handleAppStateChange
			);

			const manageVideoPlayback = () => {
				if (videoRef.current) {
					if (isFocused && isLoaded) {
						videoRef.current
							.playAsync()
							.catch((error) =>
								console.log("Error starting video:", error)
							);
					} else {
						videoRef.current
							.pauseAsync()
							.catch((error) =>
								console.log("Error pausing video:", error)
							);
					}
				}
			};

			manageVideoPlayback();

			return () => {
				appStateSubscription.remove();
				if (videoRef.current) {
					videoRef.current
						.pauseAsync()
						.catch((error) =>
							console.log(
								"Error pausing video on cleanup:",
								error
							)
						);
				}
			};
		}, [isFocused, isLoaded])
	);

	return (
		<View style={styles.videoContainer}>
			{item.type === "video" ? (
				<>
					{!isLoaded && (
						<ActivityIndicator size="large" color="green" />
					)}
					<Video
						ref={videoRef}
						source={item.source}
						style={{
							width: "100%",
							height: "100%",
							opacity: isLoaded ? 1 : 0,
						}}
						shouldPlay={true}
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
	videoContainer: {
		width: wp(83),
		height: hp(24),
		borderRadius: 25,
		overflow: "hidden",
	},
});

export default ItemCard;
