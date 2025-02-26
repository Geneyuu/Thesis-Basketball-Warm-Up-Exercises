import React, { useEffect, useContext, useState, useRef } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet,
	AppState,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Data } from "../../../_layout"; // Adjust the path as needed
import { exercises } from "../../../exercisespaths/withballExercises"; // Exercises Data
import { Video } from "expo-av"; // Import Video component from expo-av
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StartWarmups = () => {
	// Extracting values from context
	const {
		currentExerciseIndex,
		setCurrentExerciseIndex,
		timer,
		setTimer,
		isTimerRunning,
		setIsTimerRunning,
		isResting,
		setIsResting,
		exerciseTimer, // Timer duration for exercise
		restTimer, // Timer duration for rest period
	} = useContext(Data);

	// etong dineclare na current at next ay para mag serve as memory para macontrol natin kung ano yung ipapakita na exercise at future exercise.
	const currentExercise = exercises[currentExerciseIndex];
	const nextExercise = exercises[currentExerciseIndex + 1];

	// etong state na ito memory to para malaman kung false or true kung narestart ba ang video or hindi, ginamit natin to para pag nagpause tayo ng exercise mag rerestart yung video.
	const [restartVideo, setRestartVideo] = useState(false);

	// etong state na'to para sa magiging flow.
	const startWarmup = () => setIsTimerRunning(true);
	const stopWarmup = () => setIsTimerRunning(false);

	// etong state na;to para sa button ng restart Exercises, so kapag niclick natin yon, like magrereset lahat sa default, babalik sa pinaka first exercise, at pati yung timer na default ay marereset din.
	const restartWarmup = () => {
		setRestartVideo(true);
		setTimeout(() => {
			setRestartVideo(false);
		}, 150);
		setCurrentExerciseIndex(0);
		setIsResting(false);
		setIsTimerRunning(false);
		setTimer(exerciseTimer);
	};

	//etong state na'to para lang to sa functionality kapag pinause ang video, gusto natin na magrerestart lang yung video from the start para pag ni play ule, from the start yung video ng exercise na yon.
	const resetTimerAndVideo = () => {
		setTimer(exerciseTimer);
		setIsTimerRunning(false);
		setRestartVideo(true); // tapos dito, sinet lang natin sa true to para may mag run na condition na ginawa ko dun sa isang component na para dito para irestart yung video.
		setRestartVideo(false); // syempre sinet natin agad ule sa false para pag pinause natin naka default na ulet sya sa false.
	};

	// etong sideEffect naman natin eto yung like default ng mga state natin
	useEffect(() => {
		setCurrentExerciseIndex(0);
		setIsTimerRunning(false);
		setTimer(exerciseTimer);
		setIsResting(false);
	}, []); // This will only run once on mount

	// gumamit tayo ng useFocusEffect + appstate para magkaroon tayo ng functionality only para sa behavior ng user, like example kapag ni click ni user yung home button nya sa phone nya, at also kapag kunware naman yung user sa mismong application eh nagchange tabs sya, so may sideeffect na mangyayari don.
	useFocusEffect(
		React.useCallback(() => {
			// so etong part na'to eto yung sa behavior ng user kapag kunwari inactive na sya sa application gusto natin na i pause yung video dito.
			const handleAppStateChange = (appStatus) => {
				if (appStatus === "active") {
					// App comes to the foreground, continue the timer
					setIsTimerRunning(false);
				} else {
					// App goes to background, stop the timer
					stopWarmup();
				}
			};

			// so eto naman listener sya, javascript functionality to para madetect kung may changes sa behavior kung active or inactive. so kung inactive yung bali nag appStatus dun sa taas magiging value nya is automatic na inactive
			const appStateSubscription = AppState.addEventListener(
				"change",
				handleAppStateChange
			);

			// eto naman para sa part
			setIsTimerRunning(isResting || isTimerRunning);
			// if (isResting) {
			// 	setIsTimerRunning(true);
			// } else if (!isResting && !isTimerRunning) {
			// 	setIsTimerRunning(false);
			// } else if (!isResting && isTimerRunning) {
			// 	setIsTimerRunning(true);
			// }

			// Cleanup function
			return () => {
				appStateSubscription.remove();
				stopWarmup();
				setIsTimerRunning(false);

				setRestartVideo(true);
				setTimeout(() => {
					setRestartVideo(false);
				}, 100);
			};
		}, [isResting, isTimerRunning]) // ✅ No need to track isResting
	);

	// Timer logic and exercise progression
	useEffect(() => {
		let interval;

		// Kapag tumatakbo ang timer at hindi pa tapos (timer > 0), magbabawas ito ng 1 kada segundo.
		// Dahil nagbago ang `timer` o `isTimerRunning`, irere-render ulit ito.
		if (isTimerRunning && timer > 0) {
			interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
		}
		// Kapag natapos ang exercise phase (`timer === 0` at hindi pa `isResting`), lilipat sa rest phase.
		// Irere-render ulit dahil nagbago ang `isResting` at `timer`.
		else if (timer === 0 && !isResting) {
			if (currentExerciseIndex < exercises.length - 1) {
				setIsResting(true); // Magpapahinga muna bago lumipat sa susunod na exercise.
				setTimer(restTimer); // Iset ang timer para sa rest period.
			} else {
				setIsTimerRunning(false); // Kapag tapos na lahat ng exercises, ihinto ang timer.
				setCurrentExerciseIndex(0); // I-reset ang exercise index.
				setTimer(exerciseTimer); // Iset muli ang exercise timer.
				setIsResting(false); // Bumalik sa exercise state.
				router.replace("/(tabs)/"); // Ibalik sa main tab.
				setTimeout(() => {
					alert(
						"With Ball Exercises Completed! You can now play Basketball!"
					);
				}, 100);
			}
		}
		// Kapag tapos na ang rest phase (`timer === 0` at `isResting` ay true), lilipat sa susunod na exercise.
		// Irere-render ulit dahil nagbago ang `currentExerciseIndex`, `isResting`, at `timer`.
		else if (timer === 0 && isResting) {
			if (currentExerciseIndex < exercises.length - 1) {
				setCurrentExerciseIndex((prev) => prev + 1); // Lumipat sa susunod na exercise.
				setIsResting(false); // Bumalik sa exercise phase.
				setTimer(exerciseTimer); // Iset muli ang exercise timer.
			}
		}

		// Cleanup function para maiwasan ang memory leaks sa interval.
		return () => clearInterval(interval);
	}, [isTimerRunning, timer, currentExerciseIndex, isResting]); // Dependencies: kapag nagbago ang alinman dito, irere-render ulit ang component.

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.exerciseContainer}>
				<Text style={styles.heading}>
					{isResting ? "Rest" : currentExercise.name}
				</Text>

				{/* Render ExerciseImage or ExerciseVideo */}
				{isResting ? (
					<>
						<ExerciseImage
							nextExercise={nextExercise}
							currentExercise={currentExercise}
						/>
						<Text style={styles.heading}>
							Next Warm Up: {nextExercise?.name}
						</Text>
					</>
				) : (
					<ExerciseVideo
						videoSource={currentExercise.video}
						isTimerRunning={isTimerRunning}
						restartVideo={restartVideo} // Pass the restart flag here
						isResting={isResting}
					/>
				)}

				{/* Render Description and Timer Controls */}
				{!isResting && (
					<ExerciseDescription currentExercise={currentExercise} />
				)}
				<TimerControls
					timer={timer}
					isResting={isResting}
					isTimerRunning={isTimerRunning}
					startWarmup={startWarmup}
					stopWarmup={stopWarmup}
					restartWarmup={restartWarmup}
					resetTimerAndVideo={resetTimerAndVideo}
				/>
			</View>
		</ScrollView>
	);
};

// Timer function
const formatTime = (time) => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	return `${minutes < 10 ? "" + minutes : minutes}:${
		seconds < 10 ? "0" + seconds : seconds
	}`;
};

// eto naman yung component natin para sa video so ginamit ko lang yung props na pinasa ko sa exercise video dito para ma-access ng component na'to yung mga values na videoSource at isTimerRunning;
const ExerciseVideo = ({ videoSource, isTimerRunning, isResting }) => {
	const videoRef = useRef(null); // gumamit na ako dito ng useRef hooks, para direkta macontrol natin yung yung pagplay or video or pause/play/replay. tapos ni reference ko dito syempre yung video element na nasa baba.
	const [isLoaded, setIsLoaded] = useState(false);
	const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);

	// so kapag yung props na onload sa may video element nagtrue na saka nya lang to iexecute
	//gusto natin mangyari dito is kung di pa example nag onload yung video is syempre nakashow lang muna yung loading na indicator tapos pag nag onload na, ifafalse natin yung loadingindicator.
	const handleLoad = () => {
		setIsLoaded(true);
		setShowLoadingIndicator(false);
	};

	// dito naman etong sideEFfect natin, is magrurun lang kapag anything sa istimerRunning dependencies natin is nadetect na nagbago,
	// so ang default natin na istimerRuuning ay nakafalse so kung nagtrue yon dahil niclick natin yung
	useEffect(() => {
		const resetAndPlayVideo = async () => {
			if (videoRef.current && isLoaded) {
				try {
					if (isTimerRunning && !isResting) {
						// Ensure it plays only when exercise phase resumes
						await videoRef.current.playAsync(); // Play the video automatically
					} else {
						await videoRef.current.replayAsync(); // Reset the video
						await videoRef.current.pauseAsync(); // Pause it during rest phase
					}
				} catch (error) {
					console.log("Error controlling video:", error);
				}
			}
		};

		resetAndPlayVideo();
	}, [isTimerRunning, isResting, isLoaded]); // Added isResting to trigger useEffect when it changes

	return (
		<View style={styles.videoContainer}>
			{showLoadingIndicator && ( // eto conditional rendering lang ito so kapag false pa'to  magshshow lang muna yung loading
				<ActivityIndicator size="large" color="green" />
			)}

			<Video // tapos kapag okay na syempre ishshow nya nalang to.
				ref={videoRef} // dito eto yung reference sa
				source={videoSource}
				style={[
					styles.videoPlayer,
					{
						opacity: !showLoadingIndicator && isLoaded ? 1 : 0,
					},
				]}
				shouldPlay={false}
				isMuted={false}
				resizeMode="contain"
				isLooping
				onLoad={handleLoad}
				onError={(error) => console.log("Error loading video:", error)}
			/>
		</View>
	);
};

const ExerciseImage = ({ nextExercise, currentExercise }) => {
	return (
		<Image
			source={nextExercise ? nextExercise.image : currentExercise.image}
			style={styles.image}
		/>
	);
};

const ExerciseDescription = ({ currentExercise }) => {
	return (
		<View style={styles.perFormContainer}>
			<Text style={styles.performDescriptionTitle}>How to Perform:</Text>
			<Text style={styles.performDescription}>
				{currentExercise.performDescription}
				{"\n"}
				<Text style={styles.recommendationText}>
					Recommend timer for best warm up exercises is 25s.
				</Text>
			</Text>
		</View>
	);
};

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
						onPress={() => {
							resetTimerAndVideo();
						}}
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

// Styles moved to the last part
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
	container: { flex: 1, padding: wp(4), backgroundColor: "#f9f9f9" },
	exerciseContainer: { marginBottom: hp(2) },

	heading: {
		fontSize: wp(7),
		fontFamily: "Karla-Bold",
		letterSpacing: -1.5,
		color: "#161616",
		marginVertical: hp(1),
		textAlign: "center",
	},

	timerText: {
		fontSize: wp(15),
		fontFamily: "Karla-Bold",
		color: "#161616",
		marginTop: hp(1.5),
		textAlign: "center",
	},

	videoPlayer: {
		width: wp(100),
		height: hp(25),
		marginBottom: hp(2),
		borderRadius: wp(2),
		alignSelf: "center",
	},

	image: {
		width: "100%",
		height: hp(24),
		borderRadius: wp(3),
		marginBottom: hp(2),
	},

	button: {
		paddingVertical: hp(1.5),
		borderRadius: wp(2),
		justifyContent: "center",
		alignItems: "center",
		marginTop: hp(2),
	},

	buttonText: { color: "black", fontSize: wp(4.5), fontFamily: "Karla-Bold" },

	performDescription: {
		fontSize: wp(3.2),
		fontFamily: "Karla-Regular",
		color: "white",
		textAlign: "left",
		marginTop: hp(1),
	},

	performDescriptionTitle: {
		fontSize: wp(5),
		fontFamily: "Karla-Bold",
		color: "white",
		marginBottom: hp(1),
	},

	perFormContainer: {
		borderWidth: 1,
		borderColor: "#161616",
		borderRadius: wp(2),
		paddingHorizontal: wp(4),
		paddingVertical: hp(2),
		backgroundColor: "#161616",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},

	recommendationText: {
		fontSize: wp(3.3),
		fontFamily: "Karla-Regular",
		color: "green",
	},

	resetIconContainer: {
		position: "absolute",
		left: wp(15),
		top: hp(3.5),
		alignItems: "center",
		justifyContent: "center",
		width: wp(12),
		height: hp(6),
	},

	startButton: { backgroundColor: "black" },
	pauseButton: { backgroundColor: "#dc3545" },
	restartButton: { borderWidth: 2, borderColor: "black", color: "black" },
	buttonExercise: {
		color: "white",
		fontFamily: "Karla-Bold",
		fontSize: wp(4.5),
	},
});

export default StartWarmups;
