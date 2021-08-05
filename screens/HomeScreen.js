import React from "react";
import { useLayoutEffect } from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
} from "react-native";
import CustomListItem from "../components/CustomListItem";
import { Avatar, Text } from "react-native-elements";
import { auth, db } from "../config/firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";

const HomeScreen = ({ navigation }) => {
	const signOutHandler = () => {
		auth.signOut().then(() => navigation.replace("Login"));
	};
	useLayoutEffect(() => {
		navigation.setOptions({
			headerStyle: { backgroundColor: "#fff" },
			headerTitleStyle: { color: "#000" },
			headerTintColor: "#000",
			title: "Signal",
			headerLeft: () => {
				return (
					<View style={{ marginRight: 20 }}>
						<TouchableOpacity>
							<Avatar
								rounded
								source={{ uri: auth?.currentUser?.photoURL }}
							/>
						</TouchableOpacity>
					</View>
				);
			},
			headerRight: () => {
				return (
					<View
						style={{
							width: 140,
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<TouchableOpacity>
							<AntDesign name="camerao" size={24} color="#000" />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("AddChat")}
						>
							<SimpleLineIcons
								name="pencil"
								size={24}
								color="#000"
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={signOutHandler}>
							<Text h4 h4Style={{ fontSize: 18 }}>
								Logout
							</Text>
						</TouchableOpacity>
					</View>
				);
			},
		});
	}, [navigation]);

	const [chats, setChats] = useState([]);
	useEffect(() => {
		const unsubscribe = db.collection("chats").onSnapshot((snap) => {
			let chat = [];
			chat = snap.docs.map((item) => {
				return {
					id: item.id,
					chat: item.data(),
				};
			});
			setChats(chat);
		});
		return unsubscribe;
	}, []);
	console.log(chats);
	const enterChat = (id, chatName) => {
		navigation.navigate("Chat", {
			chatName,
			id,
		});
	};
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				{chats.map((item) => {
					const chatName = item.chat.chatName;
					const id = item.id;
					return (
						<CustomListItem
							enterChat={enterChat}
							key={id}
							id={id}
							chatName={chatName}
						/>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		// flex: 1,
	},
});
