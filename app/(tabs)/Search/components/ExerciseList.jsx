import React from "react";
import { FlatList } from "react-native";
import ExerciseItem from "./ExerciseItem";

const ExerciseList = ({ data, onPressItem, disabled }) => {
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<ExerciseItem
					item={item}
					onPress={() => onPressItem(item.id)}
					disabled={disabled}
				/>
			)}
		/>
	);
};

export default ExerciseList;
