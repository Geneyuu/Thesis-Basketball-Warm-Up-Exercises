import React, { useContext, useEffect, useReducer } from "react";
import { ScrollView, View, Text, StyleSheet, AppState } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Data } from "../../../_layout";
import ExerciseVideo from "../../home/with-ball/components/StartWarmups/ExerciseVideo";
import ExerciseImage from "../../home/with-ball/components/StartWarmups/ExerciseImage";
import ExerciseDescription from "../../home/with-ball/components/StartWarmups/ExerciseDescription";
import TimerControls from "../../home/with-ball/components/StartWarmups/TimerControls";
import exerciseList from "../../../exercisespaths/exercises";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const StartWarmups = () => {
	const { exerciseListAsync, restTimer } = useContext(Data);

	const initialState = {
		currentExerciseIndex: 0,
		timer: exerciseListAsync[0]?.duration,
		isTimerRunning: false,
		isResting: false,
		restartVideo: false,
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case "START_TIMER":
				return { ...state, isTimerRunning: true };
			case "STOP_TIMER":
				return { ...state, isTimerRunning: false };
			case "RESTART_WARMUP":
				return {
					...state,
					currentExerciseIndex: 0,
					isResting: false,
					isTimerRunning: false,
					timer: exerciseListAsync[0]?.duration,
					restartVideo: true,
				};

			case "RESET_RESTART_VIDEO":
				return { ...state, restartVideo: false };
			case "SET_TIMER":
				return { ...state, timer: action.payload };
			case "TICK":
				return { ...state, timer: state.timer - 1 };
			case "NEXT_EXERCISE":
				const nextIndex = state.currentExerciseIndex + 1;
				return {
					...state,
					currentExerciseIndex: nextIndex,
					timer: exerciseListAsync[nextIndex]?.duration,
					isResting: false,
				};
			case "START_REST":
				return { ...state, isResting: true, timer: restTimer };
			case "SET_TIMER_RUNNING":
				return { ...state, isTimerRunning: action.payload };
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const {
		currentExerciseIndex,
		timer,
		isTimerRunning,
		isResting,
		restartVideo,
	} = state;

	const currentExercise = {
		...exerciseList[currentExerciseIndex],
		...exerciseListAsync[currentExerciseIndex],
	};

	const nextExercise =
		currentExerciseIndex + 1 < exerciseList.length
			? {
					...exerciseList[currentExerciseIndex + 1],
					...exerciseListAsync[currentExerciseIndex + 1],
			  }
			: null;

	const startWarmup = () => dispatch({ type: "START_TIMER" });
	const stopWarmup = () => dispatch({ type: "STOP_TIMER" });

	const restartWarmup = () => {
		dispatch({ type: "RESTART_WARMUP" });
		setTimeout(() => {
			dispatch({ type: "RESET_RESTART_VIDEO" });
		}, 150);
	};

	const resetTimerAndVideo = () => {
		dispatch({ type: "SET_TIMER", payload: currentExercise?.duration });
		dispatch({ type: "STOP_TIMER" });
		dispatch({ type: "RESTART_WARMUP" });
		setTimeout(() => {
			dispatch({ type: "RESET_RESTART_VIDEO" });
		}, 100);
	};

	useFocusEffect(
		React.useCallback(() => {
			const handleAppStateChange = (appStatus) => {
				if (appStatus !== "active") {
					dispatch({ type: "STOP_TIMER" });
				} else {
					dispatch({ type: "STOP_TIMER" });
				}
			};

			const appStateSubscription = AppState.addEventListener(
				"change",
				handleAppStateChange
			);

			dispatch({
				type: "SET_TIMER_RUNNING",
				payload: state.isResting || state.isTimerRunning,
			});

			return () => {
				appStateSubscription.remove();
				dispatch({ type: "STOP_TIMER" });
				// dispatch({ type: "RESTART_WARMUP" });
				setTimeout(() => {
					dispatch({ type: "RESET_RESTART_VIDEO" });
				}, 100);
			};
		}, [isResting, isTimerRunning])
	);

	useEffect(() => {
		let interval;

		if (isTimerRunning && timer > 0) {
			interval = setInterval(() => {
				dispatch({ type: "TICK" });
			}, 1000);
		} else if (timer === 0 && !isResting) {
			if (currentExerciseIndex < 3) {
				dispatch({ type: "START_REST" });
			} else {
				dispatch({ type: "STOP_TIMER" });
				dispatch({ type: "RESTART_WARMUP" });
				router.replace("/(tabs)/");
				setTimeout(() => {
					alert(
						"With Ball Exercises Completed! You can now play Basketball!"
					);
				}, 100);
			}
		} else if (timer === 0 && isResting) {
			if (currentExerciseIndex < 3) {
				dispatch({ type: "NEXT_EXERCISE" });
			}
		}

		return () => clearInterval(interval);
	}, [
		isTimerRunning,
		timer,
		currentExerciseIndex,
		isResting,
		exerciseListAsync,
		restTimer,
	]);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.exerciseContainer}>
				{isResting ? (
					<>
						<Text style={styles.restPhaseText}>
							{isResting ? "REST" : null}
						</Text>
						{/* Ililipat natin si TimerControls dito sa unahan */}
						<TimerControls
							timer={timer}
							isResting={isResting}
							isTimerRunning={isTimerRunning}
							startWarmup={startWarmup}
							stopWarmup={stopWarmup}
							restartWarmup={restartWarmup}
							resetTimerAndVideo={resetTimerAndVideo}
							totalTimerDuration={restTimer}
						/>

						<Text style={styles.heading}>Next Warm Up:</Text>
						<>
							<ExerciseImage
								nextExercise={nextExercise}
								currentExercise={currentExercise}
							/>
							<Text style={styles.nextExercise}>
								{nextExercise?.name}
							</Text>
						</>
					</>
				) : (
					<>
						<ExerciseVideo
							videoSource={currentExercise?.video}
							isTimerRunning={isTimerRunning}
							restartVideo={restartVideo}
							isResting={isResting}
						/>

						<ExerciseDescription
							currentExercise={currentExercise}
							isResting={isResting}
						/>

						<TimerControls
							timer={timer}
							isResting={isResting}
							isTimerRunning={isTimerRunning}
							startWarmup={startWarmup}
							stopWarmup={stopWarmup}
							restartWarmup={restartWarmup}
							resetTimerAndVideo={resetTimerAndVideo}
							totalTimerDuration={currentExercise?.duration}
						/>
					</>
				)}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "white",
	},
	exerciseContainer: {
		flex: 1,
		width: "100%",
		alignItems: "center", // Center items horizontally
		justifyContent: "center", // Center items vertically
	},
	heading: {
		fontSize: wp("6%"),
		marginTop: 15,
		fontFamily: "Karla-ExtraBold",
		letterSpacing: -1.5,
		textAlign: "left", // Align the heading text to the left
		width: "90%", // Ensure the heading takes up the full width
	},

	restPhaseText: {
		fontSize: wp("9%"),
		paddingTop: 50,
		fontFamily: "Karla-ExtraBold",
		textAlign: "center", // Center the rest phase text horizontally
	},
	nextExercise: {
		fontSize: wp("6%"),
		marginBottom: wp("10%"),
		fontFamily: "Karla-Regular",
		letterSpacing: -1.2,
	},
});

export default StartWarmups;
