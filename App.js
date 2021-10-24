import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Signin from "./screens/Signin";
import Signup1 from "./screens/Signup1";
import Signup2 from "./screens/SignUp2 ";
import AppointmentList from "./screens/AppointmentList";

export default function App() {
  return (
    // <Signin></Signin>
    // <Signup2></Signup2>
    <AppointmentList></AppointmentList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
