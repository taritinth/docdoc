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
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

const OtherProfile = ({ navigation, route }) => {
  const [userinfo, setUserinfo] = useState([]);
  const [image, setImage] = useState("");
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.local.user);
  const { otherUid } = route.params;
  const openChat = (chatId) => {
    console.log(chatId);
    navigation.navigate("Chat", { chatId });
  };

  const generateDocId = (uid1, uid2) => {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  };

  const setOneToOneChat = (partnerInfo) => {
    setLoading(true);

    let senderId = auth.currentUser.uid;
    let receiverId = partnerInfo.uid;
    let chatDocId = generateDocId(senderId, receiverId);
    const timestamp = new Date().getTime();

    app
      .firestore()
      .collection("chats")
      .doc(chatDocId)
      .get((doc) => {})
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          openChat(chatDocId);
        } else {
          app
            .firestore()
            .collection("chats")
            .doc(chatDocId)
            .set({
              lastMessageId: "",
              lastMessageType: "",
              lastSentBy: "",
              lastMessageText: "",
              lastTimestamp: timestamp,
              members: [senderId, receiverId],
            })
            .then((doc) => {
              openChat(chatDocId);
            });
          console.log("Chat Document does not exist!!");
        }
      });
    // .onSnapshot((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     openChat("7wOJrxexVmKRthf4UE3g");
    //   });
    // });

    // .get((doc) => {})
    // .then((doc) => {
    //   if (doc.exists) {
    //     console.log(doc.data());
    //     openChat("7wOJrxexVmKRthf4UE3g", partnerInfo);
    //   } else {
    //     console.log("Document does not exist!!");
    //   }
    // });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    let colName = user.type == "doctor" ? "user" : "doctor";
    app
      .firestore()
      .collection(colName)
      .doc(otherUid)
      .get()
      .then((res) => {
        const data = res.data();
        data.uid = res.id;

        console.log(data);

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
      </View>
      <View style={{ flexDirection: "row", marginTop: 25 }}>
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
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => setOneToOneChat(userinfo)}
      >
        <View style={[styles.buttonContainer, { backgroundColor: "#F6F6F6" }]}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={20}
            color="#8A8A8A"
            style={{ marginRight: 10 }}
          />
          <Text style={[styles.buttonText, { color: "#595959" }]}>Message</Text>
        </View>
      </TouchableOpacity>

      {userinfo.type == "user" && (
        <View style={styles.detail}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold" }}> Date Of Birth</Text>
              <Text> {userinfo.dateOfBirth}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold" }}> Weight</Text>
              <Text> {userinfo.weight}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold" }}> Height</Text>
              <Text> {userinfo.height}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold" }}> Disease</Text>
              <Text> {userinfo.disease}</Text>
            </View>
          </View>
        </View>
      )}

      {userinfo.type == "doctor" && (
        <View style={styles.detail}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={styles.circleButton}>
              <FontAwesome name="stethoscope" size={18} color="white" />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold" }}> Specialist</Text>
              <Text> {userinfo.specialist}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={styles.circleButton}>
              <MaterialIcons name="location-on" size={18} color="white" />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold" }}> Workplace</Text>
              <Text> {userinfo.workplace}</Text>
            </View>
          </View>
        </View>
      )}

      {/* 
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
        onPress={handleSignOut}
      >
        <View style={[styles.buttonContainer, { backgroundColor: "#f35454" }]}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </View>
      </TouchableOpacity> */}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  detail: {
    flexDirection: "column",
    alignSelf: "flex-start",
    marginTop: 30,
  },
  circleButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#768692",
    borderWidth: 2,
    borderColor: "white",
    marginRight: 10,
  },
  chat: {
    backgroundColor: "#F6F6F6",
    textAlign: "center",
    // height: 40,
    // width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OtherProfile;
