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
import firebase from "../database/firebaseDB"; 



const Profile = ({ navigation }) => {
  const [fullname, setFullname] = useState("");
  const subjDoc = firebase.firestore().collection("user").doc("qknN4caIqdpf1izJVwHO");

  useEffect(() => {
    console.log("1");
    console.log(firebase);
    subjDoc
    .get((res) => {
      
    })
    .then((res) => {
      if (res.exists) {
        console.log(res.data());
        const subj = res.data();
        setFullname(subj.fullname)
      } else {
        console.log(info);
        console.log("Document does not exist!!");
      }
    });
  }, [])

  return (
    <View style={styles.container}>
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
      <Text style={styles.profile}
         >{fullname}</Text>
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
