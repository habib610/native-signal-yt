import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../config/firebase";
const CustomListItem = ({ id, chatName, enterChat }) => {
	const [messages, setMessages] = useState([])

	useEffect(()=>{
		const unsubscribe = db
			.collection("chats")
			.doc(id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapShoot) => {
				let allMessage = snapShoot.docs.map((doc) => {
					return {
						data: doc.data(),
					};
				});
				setMessages(allMessage);
			});

		return unsubscribe;
	}, [])
	// console.log(messages[0].data.displayName)
	return (
		<ListItem onPress={()=> enterChat(id, chatName)} key={id} bottomDivider>
			<Avatar
				rounded
				source={{
					uri: messages?.[0]?.data?.photoURL || "https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{   fontWeight: "bold"   }}>
					{chatName}
				</ListItem.Title>
				<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
					{messages?.[0]?.data.displayName } : {messages?.[0]?.data.message}
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default CustomListItem;

const styles = StyleSheet.create({});
