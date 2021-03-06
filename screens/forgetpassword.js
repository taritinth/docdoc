import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { auth, app } from "../database/firebaseDB";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const forgotPassword = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(function (user) {
        alert("Please check your email...");
        navigation.navigate("Signin");
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doc Doc</Text>
      <Text style={styles.username}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
      ></TextInput>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={forgotPassword}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sent</Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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

export default Signin;
