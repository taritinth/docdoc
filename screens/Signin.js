import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function SignIn(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doc Doc</Text>
      <Text style={styles.username}>Username</Text>
      <TextInput style={styles.input} placeholder="Username"></TextInput>
      <Text style={styles.password}>Password</Text>
      <TextInput style={styles.input} placeholder="Password"></TextInput>
      <Text style={styles.forgetPassword}>forget password?</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Signup1");
        }}
      >
        <Text style={styles.dontHaveAccount}>Don’t have account?</Text>
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
    color: "#32B5FF",
    fontWeight: "bold",
    fontSize: 72,
    marginBottom: 50,
  },
  input: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#F6F6F6",
    height: 50,
    // borderWidth: 1,
    // borderColor: "#d3d3d3",
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  rect: {
    width: 270,
    height: 45,
    backgroundColor: "#E6E6E6",
  },
  rect1: {
    width: 270,
    height: 45,
    backgroundColor: "#E6E6E6",
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
  cupertinoButtonInfo: {
    marginTop: 50,
    height: 50,
    width: "100%",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  dontHaveAccount: {
    color: "#595959",
    textDecorationLine: "underline",
    height: 20,
    width: 130,
    marginTop: 15,
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
