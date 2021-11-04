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

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          style={styles.profileimg}
          source={require("../assets/Boss_4.png")}
        />
      </View>
      <Text style={styles.profile}>SAPUN</Text>
      <TouchableOpacity>
        <Text style={styles}></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  image: {
    zIndex: 1,
    top: -200,
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
});

export default Profile;
