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
import { auth } from "../database/firebaseDB";
// import firebase from "../database/firebaseDB";
import { app } from "../database/firebaseDB";

const Profile = ({ navigation }) => {
  // const [fullname, setFullname] = useState("");
  const [userinfo, setUserinfo] = useState([]);

  const subjCollection = app
    .firestore()
    .collection("user")
    .doc(auth.currentUser.uid);

  useEffect(() => {
    subjCollection.get().then((res) => {
      // console.log(res.data());
      setUserinfo(res.data());
      // console.log(userinfo);
    });
  }, []);

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
    <View style={styles.containers}>
      <View style={styles.image}>
        <Image style={styles.profileimg} source={{ uri: userinfo.image }} />
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
  containers: {
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
