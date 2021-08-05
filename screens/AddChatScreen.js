import React, { useLayoutEffect } from "react";
import { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../config/firebase";
const AddChatScreen = ({ navigation }) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Add a new Chat",
		});
	}, []);
	const [name, setName] = useState("");
	const createChat = () => {
		db.collection("chats")
			.add({
				chatName: name,
			})
			.then(() => navigation.goBack())
			.catch((err) => alert(err.message));
	};
	return (
		<KeyboardAvoidingView style={styles.container}>
			<Text h4>Add Chat </Text>
			<View style={styles.inputContainer}>
				<Input
					leftIcon={() => (
						<AntDesign
							name="wechat"
							style={{ marginRight: 10 }}
							size={25}
							color="#000"
						/>
					)}
					placeholder="Chat Name"
					value={name}
					onChangeText={(e) => setName(e)}
				/>
			</View>
			<Button
				title="Add Chat"
				raised
				onPress={createChat}
				containerStyle={styles.btn}
			/>
		</KeyboardAvoidingView>
	);
};

export default AddChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	inputContainer: {
		width: 300,
		marginVertical: 20,
	},
	btn: {
		width: 200,
	},
});
