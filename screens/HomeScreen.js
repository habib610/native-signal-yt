import React from "react";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth } from "../config/firebase";
const HomeScreen = ({ navigation }) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			headerStyle: { backgroundColor: "#fff" },
			headerTitleStyle: { color: "#000" },
			headerTintColor: "#000",
			title: "Signal",
			headerLeft: () => {
				return (
					<View style={{ marginRight: 20 }}>
						<Avatar
							rounded
							source={{ uri: auth?.currentUser?.photoURL }}
						/>
					</View>
				);
			},
		});
	}, []);
	return (
		<View>
			<CustomListItem />
			<Text>I am home screen</Text>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
