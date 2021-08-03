import React from "react";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image, Input, Button } from "react-native-elements";
import { useState } from "react";
import { useEffect } from "react";
import { auth } from "../config/firebase";


const LoginScreen = ({navigation}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				navigation.replace("Home");
			}
		});
		return unsubscribe;
	});
	const signinHandler = () => {
		auth.signInWithEmailAndPassword(email, password)
			.then((res) => console.log(res))
			.catch((err) => alert(err.message));
	};
	return (
		<KeyboardAvoidingView behavior="padding"  style={styles.container}>
			<StatusBar style="inverted" />
			<Image
				source={{
					uri: "https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png",
				}}
				style={styles.logo}
			/>
			<View style={styles.inputContainer}>
				<Input
					autoFocus
					placeholder="Email"
					type="email"
					value={email}
					onChangeText={(e) => setEmail(e)}
				/>
				<Input
					placeholder="Password"
					secureTextEntry
					type="email"
					value={password}
					onChangeText={(e) => setPassword(e)}
				/>
			</View>
			
				<Button containerStyle={styles.btn} onPress={signinHandler} title="Login" />
				<Button containerStyle={styles.btn} onPress={()=> navigation.navigate("Register")} type="outline" title="Register" />
			
			
			<View style={{height: 100}} />
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#fff"
	},
	logo: {
		width: width * .4,
		height: width * .4,
		marginBottom: 30
	},
	inputContainer: {
		width: 300
	},
	btn: {
		width: 200,
		marginTop: 10
	},
});

// https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png