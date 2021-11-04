import React, { Component, useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Easing,
  Animated,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

function star() {
  return (
    <View style={styles.twelvePointBurst}>
      <View style={styles.twelvePointBurstMain} />
      <View style={styles.twelvePointBurst30} />
      <View style={styles.twelvePointBurst60} />
    </View>
  );
}

const Profile = ({ navigation }) => {
  const cycle = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  //   useEffect(() => {
  //     animate;
  //   });

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(rotate, {
            toValue: 1,
            duration: 8000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(rotate, {
            toValue: 0,
            duration: 8000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(cycle, {
            toValue: 20,
            duration: 8000,
            useNativeDriver: true,
            // easing: Easing.ease,
          }),

          Animated.timing(cycle, {
            toValue: 0,
            duration: 8000,
            useNativeDriver: true,
            // easing: Easing.ease,
          }),
        ]),
      ])
    ).start();
  });

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ scale: cycle }, { rotate: spin }],
        }}
      >
        {star()}
      </Animated.View>

      <View style={styles.image}>
        <Image
          style={styles.profileimg}
          source={require("../assets/Boss_4.png")}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate("Editprofile");
          }}
        >
          <FontAwesome5
            style={styles.editprofile}
            name="edit"
            size={36}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.profile}>SAPUN</Text>
      <TouchableOpacity>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'orange',
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  twelvePointBurst: {
    zIndex: -10,
    position: "relative",
    // alignSelf: "center",
    // alignItems: "center",
    // justifyContent: "center",
    // flex: 1,
  },
  twelvePointBurstMain: {
    width: 80,
    height: 80,
    backgroundColor: "orange",
  },
  twelvePointBurst30: {
    width: 80,
    height: 80,
    position: "absolute",
    backgroundColor: "orange",
    top: 0,
    right: 0,
    transform: [{ rotate: "30deg" }],
  },
  twelvePointBurst60: {
    width: 80,
    height: 80,
    position: "absolute",
    backgroundColor: "orange",
    top: 0,
    right: 0,
    transform: [{ rotate: "60deg" }],
  },
  image: {
    zIndex: 1,
    top: -200,
    // backgroundColor: "red",
    // marginBottom: 1,
    // alignSelf: "center",
  },
  profileimg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 2,
    alignSelf: "center",
  },
  profile: {
    fontSize: 30,
    position: "absolute",
  },
  logout: {
    position: "relative",
    top: 50,
    color: "red",
  },
  editprofile: {
    right: 0,
    bottom: 0,
    position: "absolute",
    // top: -10,
  },
});

export default Profile;
