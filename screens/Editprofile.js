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
import Loading from "../components/Loading";

const Editprofile = ({ navigation }) => {
  const [title, changeTitle] = useState("");
  const [phone, changePhone] = useState("");
  const [fullname, changeFullname] = useState("");
  const [image, changeImage] = useState("");
  const [email, changeEmail] = useState("");
  const [image2, setImage] = useState("");
  const [loading, setLoading] = useState(true);

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
    setLoading(true);

    subjCollection.get().then((res) => {
      const data = res.data();

      // changeUsername(data.username);
      if (user.type == "doctor") changeTitle(data.title);
      changePhone(data.phone);
      changeFullname(data.fullname);
      changeEmail(data.email);
      changeImage(data.image);

      if (loading) {
        setLoading(false);
      }

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
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.profileimg}
        />
      );
    } else {
      return <Image source={{ uri: image }} style={styles.profileimg} />;
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

      app
        .firestore()
        .collection(colName)
        .doc(auth.currentUser.uid)
        .update({
          // username: username,
          phone: phone,
          email: email,
          image: imageUrl,
          title: user.type == "doctor" ? title : "",
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

      app
        .firestore()
        .collection(colName)
        .doc(auth.currentUser.uid)
        .update({
          // username: username,
          phone: phone,
          email: email,
          image: image,
          title: user.type == "doctor" ? title : "",
          fullname: fullname,
        });
      console.log(image);
      navigation.navigate("Profile");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        {getImg()}
        <TouchableOpacity
          style={styles.editImgButton}
          activeOpacity={1}
          onPress={() => {
            openImagePickerAsync();
          }}
        >
          <FontAwesome5 name="pen" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {user.type == "doctor" && <Text style={styles.label}>Title</Text>}
      {user.type == "doctor" && (
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(text) => changeTitle(text)}
          placeholder="Title"
        ></TextInput>
      )}

      <Text style={styles.label}>Fullname</Text>
      <TextInput
        style={styles.input}
        value={fullname}
        onChangeText={(text) => changeFullname(text)}
        placeholder="Fullname"
      ></TextInput>

      {/* <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => changeUsername(text)}
        placeholder="Username"
      ></TextInput> */}

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(text) => changePhone(text)}
        placeholder="Phone"
      ></TextInput>

      {/* <View style={styles}>
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
      </View> */}
      {/* <TouchableOpacity>
        <Text style={styles}></Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={editprofile}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Save</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 30,
    backgroundColor: "white",
  },
  image: {
    marginTop: 25,
    marginBottom: 10,
  },

  // editprofile: {
  //   display: "inline",
  // },
  profileimg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    alignSelf: "center",
  },
  profile: {
    fontSize: 18,
    borderBottomWidth: 2,
    position: "relative",
    marginLeft: 10,
  },
  // button: {
  //   alignSelf: "center",
  //   marginTop: 20,
  // },
  editImgButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#32B5FF",
    flexDirection: "row-reverse",
    right: 0,
    bottom: 0,
    position: "absolute",
    borderWidth: 2,
    borderColor: "white",
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
  editprofile: {
    flexDirection: "row-reverse",
    right: 0,
    bottom: 0,
    position: "absolute",
  },
  input: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#F6F6F6",
    height: 50,
    // borderWidth: 1,
    // borderColor: "#d3d3d3",
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    color: "#595959",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
});

export default Editprofile;
