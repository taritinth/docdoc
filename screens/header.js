import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./Signin";
import SignUp1 from "./Signup1";
import SignUp2 from "./SignUp2";
import Appointment from "./Appointment";
import AppointmentList from "./AppointmentList";
import Home from "./Home";
const docdocNavigator = createNativeStackNavigator();

export default function Header() {
  return (
    <NavigationContainer>
      <docdocNavigator.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#32B5FF" },
          headerTintColor: "white",
        }}
      >
        <docdocNavigator.Screen name="Signin" component={SignIn} />
        <docdocNavigator.Screen name="Home" component={Home} />
        <docdocNavigator.Screen name="Signup1" component={SignUp1} />
        <docdocNavigator.Screen name="Signup2" component={SignUp2} />
        <docdocNavigator.Screen name="Appointment" component={Appointment} />
        <docdocNavigator.Screen
          name="AppointmentList"
          component={AppointmentList}
        />
      </docdocNavigator.Navigator>
    </NavigationContainer>
  );
}
