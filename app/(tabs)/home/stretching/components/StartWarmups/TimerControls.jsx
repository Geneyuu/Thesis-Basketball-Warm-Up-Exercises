import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TimerControls = ({
	timer,
	isResting,
	isTimerRunning,
	startWarmup,
	stopWarmup,
	restartWarmup,
	resetTimerAndVideo,
}) => {
	return (
		<View>
			<Text style={styles.timerText}>{formatTime(timer)}s</Text>

			{!isResting && (
				<>
					<TouchableOpacity
						style={styles.resetIconContainer}
						onPress={resetTimerAndVideo}
					>
						<Ionicons
							name="refresh-circle-outline"
							size={37}
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
				</>
			)}
			<TouchableOpacity
				style={[styles.button, styles.restartButton]}
				onPress={restartWarmup}
			>
				<Text style={styles.buttonText}>Restart Exercises</Text>
			</TouchableOpacity>
		</View>
	);
};

const formatTime = (time) => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	return `${minutes < 10 ? "" + minutes : minutes}:${
		seconds < 10 ? "0" + seconds : seconds
	}`;
};

const styles = StyleSheet.create({
	timerText: {
		fontSize: 60,
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginTop: 20,
		textAlign: "center",
	},
	resetIconContainer: {
		position: "absolute",
		left: 60,
		top: 30,
		alignItems: "center",
		justifyContent: "center",
		width: 50,
		height: 50,
	},
	button: {
		paddingVertical: 15,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: {
		color: "black",
		fontSize: 18,
		fontFamily: "Karla-Bold",
	},
	startButton: { backgroundColor: "black" },
	pauseButton: { backgroundColor: "#dc3545" },
	restartButton: { borderWidth: 2, borderColor: "black", color: "black" },
	buttonExercise: {
		color: "white",
		fontFamily: "Karla-Bold",
		fontSize: 18,
	},
});

export default TimerControls;
