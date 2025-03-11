import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TimerControls = ({
	timer,
	isResting,
	isTimerRunning,
	startWarmup,
	stopWarmup,
	restartWarmup,
	resetTimerAndVideo,
	totalTimerDuration,
	nextExercise,
}) => {
	const progress =
		timer >= totalTimerDuration
			? 0
			: Math.min(1, 1 - (timer - 1) / totalTimerDuration);

	return (
		<View style={styles.container}>
			{/*  Buttons */}
			{!isResting && (
				<>
					<TouchableOpacity
						style={styles.resetIconContainer}
						onPress={resetTimerAndVideo}
					>
						<Ionicons
							name="refresh-circle-outline"
							size={hp("3.7%")}
							color="black"
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.button,
							isTimerRunning
								? styles.pauseButton
								: styles.startButton,
						]}
						onPress={isTimerRunning ? stopWarmup : startWarmup}
					>
						<Text style={styles.buttonExercise}>
							{isTimerRunning
								? "Pause Exercise"
								: "Start Exercise"}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.restartButton]}
						onPress={restartWarmup}
					>
						<Text style={styles.buttonText}>Restart Exercises</Text>
					</TouchableOpacity>
				</>
			)}
			{/*  Progress */}
			<View style={styles.progressWrapper}>
				{isResting ? (
					<>
						<Progress.Circle
							progress={progress}
							size={wp("60%")}
							color="green"
							unfilledColor="#e0e0e0"
							borderWidth={0}
							thickness={hp("3%")}
							animated
							style={{ marginTop: 25 }}
						/>
						<View style={styles.restingTimerOverlay}>
							<Text style={styles.timerTextInside}>
								{formatTime(timer)}s
							</Text>
						</View>
					</>
				) : (
					<>
						<Progress.Bar
							progress={progress}
							width={wp("105%")}
							color="green"
							unfilledColor="#e0e0e0"
							borderWidth={0}
							height={hp("7%")}
							borderRadius={hp("1%")}
							animated
						/>

						<View style={styles.timerOverlay}>
							<Text style={styles.timerTextInside}>
								{formatTime(timer)}s
							</Text>
						</View>
					</>
				)}
			</View>
			{isResting && (
				<TouchableOpacity
					style={[
						styles.button,
						styles.restartButton,
						{ marginTop: hp("2%") },
					]}
					onPress={restartWarmup}
				>
					<Text style={styles.buttonText}>Restart Exercises</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

const formatTime = (time) => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	return `${minutes < 10 ? minutes : minutes}:${
		seconds < 10 ? "0" + seconds : seconds
	}`;
};

const styles = StyleSheet.create({
	container: {
		width: wp("100%"),
		alignSelf: "center",
		alignItems: "center",
	},

	progressWrapper: {
		marginVertical: hp("1%"),
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},

	// For Progress.Bar overlay
	timerOverlay: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
	},

	// For Progress.Circle overlay
	restingTimerOverlay: {
		position: "absolute",
		width: wp("70%"),
		height: wp("60%"),
		alignItems: "center",
		justifyContent: "center",
		top: 25,
	},

	timerTextInside: {
		fontSize: hp("5%"),
		fontFamily: "Karla-Bold",
		color: "black",
	},

	resetIconContainer: {
		position: "absolute",
		left: wp("25%"),
		top: hp("16.1%"),
		alignItems: "center",
		justifyContent: "center",
		width: wp("10%"),
		height: hp("5%"),
		zIndex: 5,
	},

	button: {
		paddingVertical: hp("1.5%"),
		width: wp("80%"),
		borderRadius: hp("1%"),
		justifyContent: "center",
		alignItems: "center",
		marginTop: hp("1%"),
	},

	buttonText: {
		color: "black",
		fontSize: hp("2%"),
		fontFamily: "Karla-Bold",
	},

	startButton: { backgroundColor: "black" },
	pauseButton: { backgroundColor: "#dc3545" },
	restartButton: { borderWidth: 1, borderColor: "black" },

	buttonExercise: {
		color: "white",
		fontFamily: "Karla-Bold",
		fontSize: hp("2%"),
	},
});

export default TimerControls;
