export const exercises = [
	{
		id: "arm-stretch-left-arm",
		name: "Arm Stretch (Left Arm)",
		video: require("../../assets/videos/video.mp4"),
		image: require("../../assets/images/withballpreview.png"),
		description:
			"Stretch your left arm upwards and hold for a few seconds to increase flexibility.",

		repetitions: 10, // 10 reps per set
	},

	{
		id: "arm-stretch-right-arm",
		name: "Arm Stretch (Right Arm)",
		video: require("../../assets/videos/pushup.mp4"),
		image: require("../../assets/images/withballpreview.png"),
		description:
			"Stretch your right arm upwards and hold for a few seconds to increase flexibility.",

		//dito walang repetion
	},

	{
		id: "arm-circles",
		name: "Arm Circles",
		video: require("../../assets/videos/pushup.mp4"),
		image: require("../../assets/images/withballpreview.png"),
		description:
			"Rotate your arms in small circles to warm up your shoulder joints.",
		repetitions: 15, // tas dito meron
	},
	{
		id: "shoulder-rolls",
		name: "Shoulder Rolls",
		video: require("../../assets/videos/pushup.mp4"),
		image: require("../../assets/images/withballpreview.png"),
		description:
			"Lift your shoulders towards your ears and roll them back and down.",
		repetitions: 10,
	},
	{
		id: "neck-tilts",
		name: "Neck Tilts",
		video: require("../../assets/videos/pushup.mp4"),
		image: require("../../assets/images/withballpreview.png"),
		description:
			"Gently tilt your head towards each shoulder to stretch your neck.",
		repetitions: 5,
	},
];

export default exercises;
