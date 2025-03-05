import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 🔥 Kuhanin ang screen dimensions
const { width, height } = Dimensions.get("window");

// 🔥 Function para mag-scale ang size dynamically
const scaleSize = (size) => (width / 375) * size; // 375px = base iPhone width

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
		<View style={styles.container}>
			<Text style={styles.timerText}>{formatTime(timer)}s</Text>

			{!isResting && (
				<>
					<TouchableOpacity
						style={styles.resetIconContainer}
						onPress={resetTimerAndVideo}
					>
						<Ionicons
							name="refresh-circle-outline"
							size={scaleSize(30)}
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
	return `${minutes < 10 ? "0" + minutes : minutes}:${
		seconds < 10 ? "0" + seconds : seconds
	}`;
};

const styles = StyleSheet.create({
	container: {
		width: "90%",
		alignSelf: "center",
		alignItems: "center",
	},
	timerText: {
		fontSize: scaleSize(50),
		fontFamily: "Karla-Bold",
		color: "#161616",
		textAlign: "center",
	},
	resetIconContainer: {
		position: "absolute",
		left: scaleSize(30),
		top: scaleSize(12),
		alignItems: "center",
		justifyContent: "center",
		width: scaleSize(40),
		height: scaleSize(40),
	},
	button: {
		paddingVertical: scaleSize(12),
		width: scaleSize(320),
		borderRadius: scaleSize(10),
		justifyContent: "center",
		alignItems: "center",
		marginTop: scaleSize(10),
	},
	buttonText: {
		color: "black",
		fontSize: scaleSize(16),
		fontFamily: "Karla-Bold",
	},
	startButton: { backgroundColor: "black" },
	pauseButton: { backgroundColor: "#dc3545" },
	restartButton: { borderWidth: 2, borderColor: "black" },
	buttonExercise: {
		color: "white",
		fontFamily: "Karla-Bold",
		fontSize: scaleSize(16),
	},
});

export default TimerControls;
