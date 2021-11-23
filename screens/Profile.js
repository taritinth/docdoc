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
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { auth, storage } from "../database/firebaseDB";
// import firebase from "../database/firebaseDB";
import { app } from "../database/firebaseDB";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";

const Profile = ({ navigation }) => {
  const [userinfo, setUserinfo] = useState([]);
  const [image, setImage] = useState("");
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.local.user);

  useEffect(() => {
    setLoading(true);

    let colName = user.type == "doctor" ? "doctor" : "user";
    app
      .firestore()
      .collection(colName)
      .doc(auth.currentUser.uid)
      .get()
      .then((res) => {
        const data = res.data();

        setUserinfo(data);
        setImage(data.image);
        // storage
        //   .ref("/" + res.data().image)
        //   .getDownloadURL()
        //   .then((url) => {
        //     setImage(url);
        //     console.log(image);
        //   });
        if (loading) {
          setLoading(false);
        }
      });
  }, [isFocused]);

  const handleSignOut = () => {
    Alert.alert("Sign Out?", "Are you sure to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await auth
            .signOut()
            .then(() => {
              navigation.replace("Signin");
            })
            .catch((error) => alert(error.message));
        },
      },
    ]);
  };

  // const subjDoc = firebase.firestore().collection("user").doc("qknN4caIqdpf1izJVwHO");
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image style={styles.profileimg} source={{ uri: userinfo.image }} />
        {/* 
        <TouchableOpacity
          style={styles.editprofile}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate("Editprofile");
          }}
        >
          <FontAwesome5 name="edit" size={36} color="black" />
        </TouchableOpacity> */}
      </View>
      <View style={{ flexDirection: "row", marginBottom: 50, marginTop: 25 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#525252",
            marginRight: 10,
          }}
        >
          {userinfo.type == "doctor" && userinfo.title} {userinfo.fullname}
        </Text>
        {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate("Editprofile");
          }}
        >
          <FontAwesome5 name="edit" size={24} color="black" />
        </TouchableOpacity> */}
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Editprofile");
        }}
      >
        <View style={[styles.buttonContainer, { backgroundColor: "#F6F6F6" }]}>
          <Text style={[styles.buttonText, { color: "#595959" }]}>
            Edit Profile
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("EditPersonal");
        }}
      >
        <View style={[styles.buttonContainer, { backgroundColor: "#F6F6F6" }]}>
          <Text style={[styles.buttonText, { color: "#595959" }]}>
            Edit Personal Information
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleSignOut}
      >
        <View style={[styles.buttonContainer, { backgroundColor: "#f35454" }]}>
          <Text style={styles.buttonText}>Sign Out</Text>
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
    justifyContent: "flex-start",
    padding: 30,
  },
  image: {
    marginTop: 25,
    // backgroundColor: "red",
    // marginBottom: 1,
    // alignSelf: "center",
  },
  profileimg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
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
  button: {
    alignSelf: "stretch",
    marginTop: 10,
  },
  buttonContainer: {
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

export default Profile;
