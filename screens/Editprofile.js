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
import { app, auth, storage } from "../database/firebaseDB";
import { useSelector, useDispatch } from "react-redux";

const Editprofile = ({ navigation }) => {
  const [username, changeUsername] = React.useState("");
  const [phone, changePhone] = React.useState("");
  const [fullname, changeFullname] = React.useState("");
  const [image, changeImage] = useState("");
  const [email, changeEmail] = useState("");

  const user = useSelector((state) => state.local.user);
  let colName = user.type == "doctor" ? "doctor" : "user";

  const subjCollection = app
    .firestore()
    .collection(colName)
    .doc(auth.currentUser.uid);

  const [selectedImage, setSelectedImage] = useState(null);

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

  useEffect(() => {
    console.log("a");
    subjCollection.get().then((res) => {
      const data = res.data();

      changeUsername(data.username);
      changePhone(data.phone);
      changeFullname(data.fullname);
      changeEmail(data.email);
      changeImage(data.image);

      // storage
      //   .ref("/" + res.data().image)
      //   .getDownloadURL()
      //   .then((url) => {
      //     changeImage(url);
      //   });
    });
  }, []);

  function getImg() {
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
        <TouchableOpacity onPress={openImagePickerAsync}>
          <Image source={{ uri: image }} style={styles.profileimg} />
        </TouchableOpacity>
      );
    }
  }

  const editprofile = async () => {
    if (!!selectedImage) {
      let imagepath = selectedImage.localUri.substring(
        selectedImage.localUri.lastIndexOf("/") + 1
      );
      console.log(imagepath);
      const response = await fetch(selectedImage.localUri);
      const blob = await response.blob();
      const reference = storage.ref().child(imagepath);
      await reference.put(blob);

      let imageUrl = "";
      await storage
        .ref(imagepath)
        .getDownloadURL()
        .then((url) => {
          imageUrl = url;
        });

      app.firestore().collection(colName).doc(auth.currentUser.uid).update({
        username: username,
        phone: phone,
        email: email,
        image: imageUrl,
        fullname: fullname,
      });

      navigation.navigate("Profile");
    } else {
      let imagepath = image.substring(image.lastIndexOf("/") + 1);

      console.log(imagepath);

      const response = await fetch(image);
      const blob = await response.blob();
      const reference = storage.ref().child(imagepath);
      await reference.put(blob);

      app.firestore().collection(colName).doc(auth.currentUser.uid).update({
        username: username,
        phone: phone,
        email: email,
        image: imagepath,
        fullname: fullname,
      });
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        {getImg()}
        <TouchableOpacity
          style={styles.editprofile}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate("Editprofile");
          }}
        >
          <FontAwesome5 name="edit" size={36} color="black" />
        </TouchableOpacity>
      </View>

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
  editprofile: {
    flexDirection: "row-reverse",
    right: 0,
    bottom: 0,
    position: "absolute",
  },
});

export default Editprofile;
