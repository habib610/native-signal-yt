import React, { useLayoutEffect, useState } from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { Avatar, Text } from "react-native-elements";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../config/firebase";
import firebase from "firebase/app";

const ChatScreen = ({ navigation, route }) => {
	const { id, chatName } = route.params;
	const chatHolderId = id;

	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Avatar
						source={{
							uri:
								messages[0]?.data.photoURL ||
								"https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
						}}
						rounded
					/>
					<Text
						h4
						h4Style={{
							fontSize: 18,
							marginLeft: 10,
							color: "white",
						}}
					>
						{chatName}
					</Text>
				</View>
			),
			headerRight: () => (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: 70,
					}}
				>
					<TouchableOpacity>
						<FontAwesome
							name="video-camera"
							size={24}
							color="white"
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons name="call" size={24} color="white" />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation, messages]);

	const sendMessage = () => {
		Keyboard.dismiss();

		db.collection("chats").doc(chatHolderId).collection("messages").add({
			message: input,
			displayName: auth.currentUser.displayName,
			email: auth.currentUser.email,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			photoURL: auth.currentUser.photoURL,
		});
		setInput("");
	};

	useLayoutEffect(() => {
		const unsubscribe = db
			.collection("chats")
			.doc(chatHolderId)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapShoot) => {
				let allMessage = snapShoot.docs.map((doc) => {
					return {
						id: doc.id,
						data: doc.data(),
					};
				});
				setMessages(allMessage);
			});

		return unsubscribe;
	}, [route]);
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />
			<KeyboardAvoidingView
				style={styles.chat}
				keyboardVerticalOffset={90}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<>
						<ScrollView
							contentContainerStyle={{
								paddingTop: 15,
								paddingLeft: 15,
							}}
						>
							{messages.map((item) => {
								let {
									message,
									email,
									id,
									photoURL,
									displayName,
								} = item.data;
								return auth.currentUser.email === email ? (
									<View key={id} style={styles.receiver}>
										<Avatar
											rounded
											containerStyle={{
												position: "absolute",
												bottom: -10,
												right: 2,
											}}
											size={20}
											source={{ uri: photoURL }}
										/>
										<Text style={styles.receiverText} h5>
											{message}
										</Text>
									</View>
								) : (
									<View key={id} style={styles.sender}>
										<Avatar
											rounded
											containerStyle={{
												position: "absolute",
												bottom: -15,
												left: -5,
											}}
											size={30}
											source={{ uri: photoURL }}
										/>
										<Text style={styles.senderName} h6>
											{displayName}
										</Text>
										<Text style={styles.senderText} h5>
											{message}
										</Text>
									</View>
								);
							})}
						</ScrollView>
						<View style={styles.footer}>
							<TextInput
								style={styles.input}
								placeholder="Write Message"
								value={input}
								onChangeText={(text) => setInput(text)}
								onSubmitEditing={sendMessage}
							/>
							<TouchableOpacity activeOpacity={0.5}>
								<Ionicons
									name="send"
									size={25}
									color="#2b68e6"
									onPress={sendMessage}
								/>
							</TouchableOpacity>
						</View>
					</>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	chat: {
		flex: 1,
	},
	footer: {
		flexDirection: "row",
		width: "100%",
		padding: 15,
		alignItems: "center",
	},
	input: {
		bottom: 0,
		flex: 1,
		marginRight: 20,
		height: 40,
		padding: 10,
		color: "grey",
		borderRadius: 30,
		backgroundColor: "#ececec",
		borderColor: "transparent",
	},
	receiver: {
		padding: 15,
		backgroundColor: "#ececec",
		alignSelf: "flex-end",
		borderRadius: 20,
		marginRight: 15,
		marginBottom: 20,
		maxWidth: "80%",
		position: "relative",
	},
	sender: {
		padding: 15,
		backgroundColor: "#2b68e6",
		alignSelf: "flex-start",
		borderRadius: 20,
		marginRight: 15,
		marginBottom: 20,
		maxWidth: "80%",
		position: "relative",
	},
	senderName: {
		left: 10,
		paddingRight: 10,
		fontSize: 10,
		color: "white",
	},
	senderText: {
		color: "white",
		fontWeight: "bold",
		marginLeft: 10,
		marginBottom: 15,
	},
	receiverText: {
		color: "black",
		fontWeight: "bold",
		marginLeft: 10,
		marginBottom: 15,
	},
});
