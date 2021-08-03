import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
const CustomListItem = ({ id, chatName, enterChat }) => {
	return (
		<ListItem>
			<Avatar
				rounded
				source={{
					uri: "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
				}}
			/>
			<ListItem.Content>
				<ListItem.Title>Custom Title</ListItem.Title>
				<ListItem.Subtitle ellipsizeMode="tail">
					Last seen 10hrs ago
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default CustomListItem;

const styles = StyleSheet.create({});
