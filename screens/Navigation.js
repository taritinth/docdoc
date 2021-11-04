import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, AntDesign, Ionicons } from "@expo/vector-icons";
import Home from "./Home";
import Message from "./Message";
import Profile from "./Profile";
import Editprofile from "./Editprofile";
import SignIn from "./Signin";
import SignUp1 from "./Signup1";
import SignUp2 from "./SignUp2";
import Appointment from "./Appointment";
import AppointmentList from "./AppointmentList";

const docdocNavigator = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <docdocNavigator.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#32B5FF" },
          headerTintColor: "white",
          headerShown: false,
        }}
      >
        <docdocNavigator.Screen name="Signin" component={SignIn} />
        <docdocNavigator.Screen
          name="NavigationTabbar"
          component={NavigationTabbar}
          options={{ headerShown: false }}
        />
        <docdocNavigator.Screen name="Signup1" component={SignUp1} />
        <docdocNavigator.Screen name="Signup2" component={SignUp2} />
        <docdocNavigator.Screen name="Appointment" component={Appointment} />
        <docdocNavigator.Screen
          name="AppointmentList"
          component={AppointmentList}
        />
        <docdocNavigator.Screen name="Editprofile" component={Editprofile} />
      </docdocNavigator.Navigator>
    </NavigationContainer>
  );
}

const NavigationTabbar = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#ffffff" },
        tabBarLabelStyle: { fontSize: 13, marginTop: -5, marginBottom: 5 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home-outline" : "home-outline";
          }
          if (route.name === "Message") {
            iconName = focused
              ? "md-chatbubble-ellipses-outline"
              : "md-chatbubble-ellipses-outline";
          }
          if (route.name === "Appointment") {
            iconName = focused ? "calendar-outline" : "calendar-outline";
          }
          if (route.name === "Profile") {
            iconName = focused ? "person-outline" : "person-outline";
          }
          return <Ionicons name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: "#32B5FF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Message" component={Message} />
      <BottomTab.Screen name="Appointment" component={AppointmentList} />
      <BottomTab.Screen name="Profile" component={Profile} />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
