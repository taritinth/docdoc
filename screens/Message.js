import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import AppointmentList from "./AppointmentList";
import Signup1 from "./Signup1";

export default function Message() {
  //   const [coloricon, setColoricon] = useState("AppointmentList");

  let messages = [
    {
      id: 1,
      sender: "Dr.FlukeTu",
      last_msg:
        "HelloHelloHelloHelloHelloHello HelloHelloHelloHelloHelloHelloHelloHello HelloHello",
      datetime: "2021-11-03",
    },
    {
      id: 2,
      sender: "Dr.FlukeTu",
      last_msg: "Hello",
      datetime: "2021-11-03",
    },
    {
      id: 3,
      sender: "Dr.FlukeTu",
      last_msg: "Hello",
      datetime: "2021-11-03",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {messages.map((item) => {
          return (
            <View style={styles.box} key={item.id}>
              <View style={styles.section}>
                <Image
                  style={styles.img}
                  source={require("../assets/profile_img.png")}
                />
              </View>
              <View style={[styles.section, { flex: 1 }]}>
                <Text style={styles.senderName}>{item.sender}</Text>
                <Text style={styles.lastMsg} numberOfLines={1}>
                  {item.last_msg}
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.datetime}>{item.datetime}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    flexDirection: "row",
    borderBottomWidth: 0.15,
    borderBottomColor: "#A5A5A5",
    paddingVertical: 2,
  },
  section: {
    padding: 10,
  },
  senderName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  datetime: {
    color: "#A5A5A5",
  },
  lastMsg: {
    color: "#6F6F6F",
  },
  img: {
    width: 65,
    height: 65,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
});
