import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";

function Signin(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.docDoc}>Doc Doc</Text>
      <Text style={styles.username}>Username</Text>
      <View style={styles.rect}></View>
      <Text style={styles.password}>Password</Text>
      <View style={styles.rect1}></View>
      <Text style={styles.forgetPassword}>forget password?</Text>
      <TouchableOpacity style={styles.cupertinoButtonInfo}>
        <Text style={styles.signin}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.dontHaveAccount}>Don’t have account?</Text>
    </View>
  );
}

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red',
    alignItems: "center",
    padding: 30,
  },
  docDoc: {
    color: "#121212",
    fontSize: 72,
    marginTop: 110,
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
    color: "#121212",
    alignSelf: "flex-start",
  },
  password: {
    color: "#121212",
    alignSelf: "flex-start",
    marginTop:50,
  },
  forgetPassword: {
    color: "#121212",
  },
  cupertinoButtonInfo: {
    height: 50,
    width: 280,
    backgroundColor: "blue",
  },
  dontHaveAccount: {
    color: "#121212",
    height: 20,
    width: 130,
    marginTop: 15,
  },
  signin: {
    color: "#FFFFFF",
    alignItems: "center",
  },
});
