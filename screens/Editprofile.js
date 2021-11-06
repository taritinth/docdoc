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
import {
  FontAwesome5,
  Ionicons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const Editprofile = ({ navigation }) => {
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  };
  const [username, changeUsername] = React.useState("");
  const [phone, changePhone] = React.useState("");
  const [password, changePassword] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        {/* <Image
          style={styles.profileimg}
          source={require("../assets/Boss_4.png")}
        /> */}
        <TouchableOpacity
          onPress={openImagePickerAsync}
          style={styles.profileimg}
        >
          <Text style={styles.buttonText2}>Pick a photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.editprofile}>
        <Ionicons name="person-outline" size={24} color="black" />
        <TextInput
          style={styles.profile}
          placeholder="Username"
          onChangeText={changeUsername}
        ></TextInput>
      </View>
      <View style={styles.editprofile}>
        <Feather name="phone" size={24} color="black" />
        <TextInput
          style={styles.profile}
          placeholder="Phonenumber"
          onChangeText={changePhone}
        ></TextInput>
      </View>
      <View style={styles.editprofile}>
        <FontAwesome name="key" size={24} color="black" />
        <TextInput
          style={styles.profile}
          placeholder="Password"
          onChangeText={changePassword}
        ></TextInput>
      </View>
      <TouchableOpacity>
        <Text style={styles}></Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("NavigationTabbar");
        }}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>SAVE</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("NavigationTabbar");
        }}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>BACK</Text>
        </View>
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
  button2: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText2: {
    fontSize: 20,
    color: "#fff",
  },
  image: {
    zIndex: 1,
    top: -80,
  },
  editprofile: {
    display: "inline",
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
    fontSize: 18,
    borderBottomWidth: 2,
    position: "relative",
    marginLeft: 10,
  },
  button: {
    alignSelf: "center",
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: "#32B5FF",
    paddingVertical: 6,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default Editprofile;
