import React, { useRef, useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Video } from "expo-av";

const ExerciseVideo = ({ videoSource, isTimerRunning, isResting }) => {
	const videoRef = useRef(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);

	const handleLoad = () => {
		setTimeout(() => {
			setIsLoaded(true);
			setShowLoadingIndicator(false);
		}, 150);
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
		width: "100%",
		alignSelf: "center",
		alignItems: "center",
	},
	videoPlayer: {
		width: "100%",
		height: 200,
		borderRadius: 10,
	},
});

export default ExerciseVideo;
