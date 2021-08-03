import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { Input, Button, Text } from "react-native-elements";

const RegisterScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [imgUrl, setImgUrl] = useState("");

	const registerHandler = () => {};
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "android" ? "height" : "padding"}
			style={styles.container}
		>
			<StatusBar style="inverted" />
			<Text h3 style={{ marginBottom: 50 }}>
				Create Signal Account
			</Text>
			<View style={styles.inputContainer}>
				<Input
					placeholder="Full Name"
					autoFocus
					type="text"
					value={fullName}
					onChangeText={(e) => setFullName(e)}
				/>
				<Input
					placeholder="Email"
					value={email}
					type="email"
					onChangeText={(e) => setEmail(e)}
				/>
				<Input
					placeholder="Password"
					value={password}
					type="password"
					secureTextEntry
					onChangeText={(e) => setPassword(e)}
				/>
				<Input
					placeholder="Image Url (Optional)"
					value={imgUrl}
					type="text"
					onSubmitEditing={registerHandler}
					onChangeText={(e) => setImgUrl(e)}
				/>
			</View>
			<Button raised containerStyle={styles.btn} title="Register" />
			<View style={{ height: Platform.OS === "android" ? 200 : 100 }} />
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 10,
		alignItems: "center",
		backgroundColor: "white",
	},
	inputContainer: {
		width: 300,
	},
	btn: {
		width: 300,
		marginTop: 10,
	},
});
