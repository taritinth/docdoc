import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";

function Signin(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.docDoc}>Doc Doc</Text>
      <View style={styles.rect}></View>
      <View style={styles.rect1}></View>
      <Text style={styles.username}>Username</Text>
      <Text style={styles.password}>Password</Text>
      <Text style={styles.forgetPassword}>forget password?</Text>
      <TouchableOpacity style={styles.cupertinoButtonInfo} ><Text style={styles.signin}>Sign In</Text></TouchableOpacity>
      <Text style={styles.dontHaveAccount}>Don’t have account?</Text>
    </View>
  );
}

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  docDoc: {
    color: "#121212",
    fontSize: 72,
    marginTop: 109,
    marginLeft: 53
  },
  rect: {
    width: 268,
    height: 45,
    backgroundColor: "#E6E6E6",
    marginTop: 91,
    marginLeft: 53
  },
  rect1: {
    width: 268,
    height: 45,
    backgroundColor: "#E6E6E6",
    marginTop: 50,
    marginLeft: 53
  },
  username: {
    color: "#121212",
    marginTop: -170,
    marginLeft: 53
  },
  password: {
    color: "#121212",
    marginTop: 82,
    marginLeft: 53
  },
  forgetPassword: {
    color: "#121212",
    marginTop: 75,
    marginLeft: 212
  },
  cupertinoButtonInfo: {
    height: 49,
    width: 287,
    marginTop: 121,
    marginLeft: 43,
    backgroundColor: "blue",
  },
  dontHaveAccount: {
    color: "#121212",
    height: 20,
    width: 131,
    marginTop: 13,
    marginLeft: 115
  },
  signin:{
    color: "#FFFFFF",
    alignItems: "center",
  }
});

