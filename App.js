import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import SignIn from "./screens/SignIn";
// import SignUp1 from "./screens/SignUp1";
// import SignUp2 from "./screens/SignUp2";
// import Appointment from "./screens/Appointment";
// import AppointmentList from "./screens/AppointmentList";
// import Home from "./screens/Home";
import NavigationTabbar from "./screens/NavigationTabbar.js";
import Header from "./screens/header";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    // <SignIn></SignIn>
    // <SignUp2></SignUp2>
    // <SignUp1></SignUp1>
    // <Appointment></Appointment>
    // <AppointmentList></AppointmentList>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="AppointmentList">
    //     <Stack.Screen
    //       name="AppointmentList"
    //       component={AppointmentList}
    //       options={{
    //         title: "AppointmentList",
    //         headerStyle: { backgroundColor: "#ffffff" },
    //       }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <Header></Header>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
