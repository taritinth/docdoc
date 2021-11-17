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
import { app, auth } from "../database/firebaseDB";

const Editprofile = ({ navigation }) => {
  let [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };
  const [username, changeUsername] = React.useState("");
  const [phone, changePhone] = React.useState("");
  const [fullname, changeFullname] = React.useState("");
  const [image, changeImage] = useState("")
  const [email, changeEmail] = useState("")

  const subjCollection = app
    .firestore()
    .collection("user")
    .doc(auth.currentUser.uid);

  useEffect(() => {
    subjCollection.get().then((res) => {
      changeUsername(res.data().username);
      changePhone(res.data().phone);
      changeFullname(res.data().fullname);
      changeImage(res.data().image)
      changeEmail(res.data().email)
    });
  }, []);

  function img() {
    if (selectedImage !== null) {
      console.log(selectedImage.localUri);
      return (
        <TouchableOpacity onPress={openImagePickerAsync}>
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.profileimg}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={openImagePickerAsync}>
          <Image source={{ uri: image }} style={styles.profileimg} />
        </TouchableOpacity>
      );
    }
  }
  

  const editprofile = () => {
    app.firestore().collection("user").doc(auth.currentUser.uid).set({
      username: username,
      phone: phone,
      email: email,
      image: selectedImage.localUri,
      fullname: fullname,
    });
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>{img()}</View>

      <View style={styles}>
        <Ionicons name="person-outline" size={24} color="black" />
        <TextInput
          style={styles.profile}
          placeholder="Username"
          value={username}
          onChangeText={(text) => changeUsername(text)}
        ></TextInput>
      </View>
      <View style={styles}>
        <Feather name="phone" size={24} color="black" />
        <TextInput
          style={styles.profile}
          placeholder="Phonenumber"
          value={phone}
          onChangeText={(text) => changePhone(text)}
        ></TextInput>
      </View>
      <View style={styles}>
        <FontAwesome name="key" size={24} color="black" />
        <TextInput
          style={styles.profile}
          placeholder="fullname"
          value={fullname}
          onChangeText={(text) => changeFullname(text)}
        ></TextInput>
      </View>
      <TouchableOpacity>
        <Text style={styles}></Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={editprofile}
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
  image: {
    zIndex: 1,
    top: -80,
  },
  // editprofile: {
  //   display: "inline",
  // },
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
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default Editprofile;
