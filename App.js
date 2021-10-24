import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./screens/SignUn";
import SignUp1 from "./screens/SignUp1";
import SignUp2 from "./screens/SignUp2 ";

export default function App() {
  return (
    // <SignIn></SignIn>
    <SignUp1></SignUp1>
    // <SignUp2></SignUp2>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
