import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import AppointmentList from "./AppointmentList";
import Home from "./Home";
import Message from "./Message";

const BottomTab = createBottomTabNavigator();

export default function NavigationTabbar() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName="AppointmentList"
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: "#ffffff" },
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            }
            if (route.name === "Message") {
              iconName = focused ? "rocketchat" : "rocketchat";
            }
            if (route.name === "AppointmentList") {
              iconName = focused ? "calendar-alt" : "calendar-alt";
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#32B5FF",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <BottomTab.Screen name="Home" component={Home} />
        <BottomTab.Screen name="Message" component={Message} />
        <BottomTab.Screen name="AppointmentList" component={AppointmentList} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
