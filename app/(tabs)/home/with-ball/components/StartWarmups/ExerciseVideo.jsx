import React, { useRef, useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Video } from "expo-av";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ExerciseVideo = ({ videoSource, isTimerRunning, isResting }) => {
	const videoRef = useRef(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);

	const handleLoad = () => {
		setTimeout(() => {
			setIsLoaded(true);
			setShowLoadingIndicator(false);
		}, 250);
	};

	useEffect(() => {
		const resetAndPlayVideo = () => {
			try {
				if (isTimerRunning && !isResting) {
					videoRef.current.playAsync();
				} else {
					videoRef.current.setPositionAsync(0);
					setTimeout(() => videoRef.current.pauseAsync(), 100);
				}
			} catch (error) {
				console.error("Error controlling video:", error);
			}
		};

		resetAndPlayVideo();
	}, [isTimerRunning, isResting, isLoaded]);

	return (
		<View style={styles.videoContainer}>
			{showLoadingIndicator && (
				<ActivityIndicator size="large" color="green" />
			)}
			<Video
				ref={videoRef}
				source={videoSource}
				style={[
					styles.videoPlayer,
					{ opacity: !showLoadingIndicator && isLoaded ? 1 : 0 },
				]}
				shouldPlay={false}
				isMuted={false}
				resizeMode="contain"
				isLooping
				onLoad={handleLoad}
				onError={(error) => console.log("Error loading video:", error)}
				useNativeControls={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	videoContainer: {
		flex: 1,
		width: "100%",
		height: hp("35%"),
		alignItems: "center",
		maxHeight: 360,
	},
	videoPlayer: {
		maxWidth: "auto", // Full width
		height: hp("33%"), // Dynamic height based on aspect ratio
		aspectRatio: 16 / 9, // Para laging tama ang video dimensions
	},
});

export default ExerciseVideo;
