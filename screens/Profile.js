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
import { auth, storage } from "../database/firebaseDB";
// import firebase from "../database/firebaseDB";
import { app } from "../database/firebaseDB";
import { useIsFocused } from "@react-navigation/native";

const Profile = ({ navigation }) => {
  const [userinfo, setUserinfo] = useState([]);
  const [image, setImage] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    app
      .firestore()
      .collection("user")
      .doc(auth.currentUser.uid)
      .get()
      .then((res) => {
        setUserinfo(res.data());
        storage
          .ref("/" + res.data().image)
          .getDownloadURL()
          .then((url) => {
            setImage(url);
            console.log(image);
          });
      });
  }, [isFocused]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Signin");
      })
      .catch((error) => alert(error.message));
  };

  // const subjDoc = firebase.firestore().collection("user").doc("qknN4caIqdpf1izJVwHO");

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          style={styles.profileimg}
          source={image ? { uri: image } : null}
        />

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
      <Text style={{ fontSize: 18 }}>Name: {userinfo.fullname}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.logout}>
        <Text style={{ color: "red" }}>Logout</Text>
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
  image: {
    top: -100,
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
    // position: "absolute",
  },
  logout: {
    position: "relative",
    top: 50,
    // backgroundColor: "red",
  },
  editprofile: {
    flexDirection: "row-reverse",
    right: 0,
    bottom: 0,
    position: "absolute",
  },
});

export default Profile;
