"use strict";

import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useValidation } from "react-native-form-validator";

const SignUp1 = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorphone, setErrorphone] = useState(!true);
  const [errorname, setErrorname] = useState(!true);
  const [countchar, setCountchar] = useState(0);

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
    console.log(pickerResult);
    setSelectedImage({ localUri: pickerResult.uri });
  };

  function img() {
    if (selectedImage !== null) {
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
        <TouchableOpacity
          onPress={openImagePickerAsync}
          style={styles.profileimg}
        ></TouchableOpacity>
      );
    }
  }

  const [iserror, setIserror] = useState(false);

  function showerror(error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

  function checkvalidate() {
    if (errorphone || errorname || countchar > 0) {
      alert("Name or Phone is false");
      // setIserror(false);
    } else if (!selectedImage || !name || !phone) {
      alert("Please enter image or name or phone");
    } else {
      navigation.navigate("Signup2", {
        fullname: name,
        phone: phone,
        image: selectedImage,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <View style={styles.image}>{img()}</View>
      <Text style={styles.fullname}>Fullname</Text>
      <TextInput
        style={[styles.input, errorname && styles.iserror]}
        placeholder="Fullname"
        onChangeText={(text) => {
          if (text.length < 1) {
            setErrorname(true);
          } else {
            setErrorname(false);
            setName(text);
          }
        }}
      ></TextInput>
      {errorname && showerror("Name minLength is 1")}

      <Text style={styles.phone}>Phone</Text>
      <TextInput
        style={[styles.input, errorphone && styles.iserror]}
        placeholder="Phone"
        keyboardType="numeric"
        maxLength={10}
        onChangeText={(text) => {
          if (text.length < 9) {
            setErrorphone(true);
            // setCountchar(countchar + 1);
          } else {
            setErrorphone(false);
            setPhone(text);
          }
        }}
      ></TextInput>
      {errorphone && showerror("Phonenumber minLength is 9 or charracter")}

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => checkvalidate()}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Next</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  image: {
    zIndex: 1,
    top: -80,
  },
  title: {
    color: "#525252",
    fontWeight: "bold",
    fontSize: 40,
    marginLeft: 10,
    marginBottom: 110,
    alignSelf: "flex-start",
  },
  input: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  iserror: {
    borderWidth: 1,
    borderColor: "red",
  },
  fullname: {
    fontSize: 18,
    marginLeft: 10,
    color: "#595959",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  phone: {
    fontSize: 18,
    marginLeft: 10,
    color: "#595959",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 25,
  },
  profileimg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 2,
    alignSelf: "center",
  },

  button: {
    alignSelf: "stretch",
    marginTop: 40,
  },
  buttonContainer: {
    backgroundColor: "#32B5FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
export default SignUp1;
