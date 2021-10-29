import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function SignUp2(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.username}>Username</Text>
      <TextInput style={styles.input} placeholder="Username"></TextInput>
      <Text style={styles.password}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Password"
      ></TextInput>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Signin");
        }}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    color: "#525252",
    fontWeight: "bold",
    fontSize: 40,
    marginLeft: 10,
    marginBottom: 110,
    marginBottom: 50,
    alignSelf: "flex-start",
  },
  input: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  username: {
    fontSize: 18,
    marginLeft: 10,
    color: "#595959",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  password: {
    fontSize: 18,
    marginLeft: 10,
    color: "#595959",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 25,
  },
  forgetPassword: {
    marginTop: 10,
    color: "#595959",
    alignSelf: "flex-end",
  },
  button: {
    alignSelf: "stretch",
    marginTop: 40,
  },
  buttonContainer: {
    backgroundColor: "#32B5FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
