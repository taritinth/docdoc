import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FontAwesome5,
  AntDesign,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Home from "./Home";
import Message from "./Message";
import Profile from "./Profile";
import OtherProfile from "./OtherProfile";
import Editprofile from "./Editprofile";
import SignIn from "./Signin";
import SignUp1 from "./Signup1";
import SignUp2 from "./SignUp2";
import SignUp3 from "./SignUp3";
import Appointment from "./Appointment";
import AppointmentList from "./AppointmentList";
import Forgetpassword from "./forgetpassword";
import doctorAppointment from "./doctorappointment";
import Chat from "./Chat";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../database/firebaseDB";

const docdocNavigator = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const Navigation = ({ navigation }) => {
  const user = useSelector((state) => state.local.user);

  const getUserIdByChatId = (chatId) => {
    let uid1 = chatId.slice(0, 28);
    let uid2 = chatId.slice(28);
    let array = [uid1, uid2];
    return array.filter((uid) => uid != auth.currentUser.uid)[0];
  };

  return (
    <NavigationContainer>
      <docdocNavigator.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#F8F8F8" },
          headerTintColor: "#000",
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
        <docdocNavigator.Screen name="Signup3" component={SignUp3} />
        <docdocNavigator.Screen
          name="Forgetpassword"
          component={Forgetpassword}
        />
        <docdocNavigator.Screen
          name="Chat"
          component={Chat}
          options={({ route, navigation }) => ({
            headerRight: () => (
              <MaterialIcons
                name="person"
                size={30}
                color={"#595959"}
                onPress={() => {
                  console.log(route.params.chatId);
                  navigation.navigate("OtherProfile", {
                    otherUid: getUserIdByChatId(route.params.chatId),
                  });
                }}
              />
            ),
            title: "Chat",
            headerShown: true,
          })}
        />
        <docdocNavigator.Screen
          name="Appointment2"
          component={Appointment}
          options={{ title: "Create Appointment", headerShown: true }}
        />
        <docdocNavigator.Screen
          name="AppointmentList"
          component={AppointmentList}
        />
        <docdocNavigator.Screen
          name="Editprofile"
          component={Editprofile}
          options={{ title: "Edit Profile", headerShown: true }}
        />
        <docdocNavigator.Screen
          name="OtherProfile"
          component={OtherProfile}
          options={{ title: "Other Profile", headerShown: true }}
        />
        <docdocNavigator.Screen
          name="doctorAppointment"
          component={doctorAppointment}
          options={{ title: "DoctorAppointment", headerShown: true }}
        />
      </docdocNavigator.Navigator>
    </NavigationContainer>
  );
};

const NavigationTabbar = ({ navigation }) => {
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
      <BottomTab.Screen
        name="Appointment"
        component={AppointmentList}
        options={{
          title: "Appointment",
          headerShown: true,
          headerRight: () => {
            return (
              user.type == "doctor" && (
                <AntDesign
                  onPress={() => navigation.navigate("doctorAppointment")}
                  style={{ marginRight: 15 }}
                  name="setting"
                  size={24}
                  color="black"
                />
              )
            );
          },
        }}
      />
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

export default Navigation;
