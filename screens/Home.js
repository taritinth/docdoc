import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import AppointmentList from "./AppointmentList";
import Signup1 from "./Signup1";

export default function Home() {
  //   const [coloricon, setColoricon] = useState("AppointmentList");

  return (
    <View>
      <Text>home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
