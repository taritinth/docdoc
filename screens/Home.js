import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import AppointmentList from "./AppointmentList";
import Signup1 from "./Signup1";
import Loading from "../components/Loading";
import { app, auth } from "../database/firebaseDB";
import { Button } from "react-native-elements";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export default function Home({ navigation }) {
  //   const [coloricon, setColoricon] = useState("AppointmentList");
  const [doctors, setDoctors] = useState([]);
  const [scrollView, setScrollView] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const allDoctors = [];
    const subscriber = app
      .firestore()
      .collection("doctor")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.uid = doc.id;
          allDoctors.push(data);
        });
        setDoctors(allDoctors);
      });

    if (loading) {
      setLoading(false);
    }

    // Stop listening for updates when no longer required
    return () => {
      subscriber();
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* <Text>home</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Appointment2")}>
        <Text>Appointment</Text>
      </TouchableOpacity> */}
        <ScrollView
          ref={(ref) => {
            setScrollView(ref);
          }}
          onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
        >
          {doctors.map((doctor, index) => (
            <View style={styles.chatbox} key={index}>
              <View style={styles.appointment} key={doctor.uid}>
                <Image
                  style={styles.img}
                  source={{
                    uri: doctor.image,
                  }}
                />
                <View style={styles.doctordetail}>
                  <Text style={styles.name}>Dr. {doctor.fullname}</Text>
                  <Text style={styles.type}>{doctor.type}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <MaterialIcons
                      name="location-on"
                      size={14}
                      color="gray"
                      style={{ marginTop: 4 }}
                    />
                    <Text style={styles.place}> {doctor.place}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.chat}
                onPress={() => setOneToOneChat(doctor)}
              >
                <View style={{ width: "40%" }} />
                <Ionicons
                  style={{ marginVertical: 10 }}
                  name="chatbubble-ellipses-outline"
                  size={24}
                  color="black"
                />
                <Text style={{ marginVertical: 10 }}> แชท</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  box: {
    flexDirection: "row",
    borderBottomWidth: 0.15,
    borderBottomColor: "#A5A5A5",
    paddingVertical: 2,
  },
  appointment: {
    flexWrap: "wrap",
    backgroundColor: "#ffffffff",
    flexDirection: "row",
  },
  appointmentdetail: {
    // flex: 1,
    padding: 10,
    width: "33%",
  },
  img: {
    width: 65,
    height: 65,
    resizeMode: "cover",
    alignSelf: "flex-end",
    borderRadius: 150 / 2,
    overflow: "hidden",
    margin: 20,
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    color: "#000",
  },
  doctordetail: {
    flexDirection: "column",
  },
  type: {
    alignSelf: "flex-start",
    backgroundColor: "#BEE0FF",
    color: "#41698E",
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
  place: {
    fontSize: 14,
    marginBottom: 10,
  },
  chat: {
    backgroundColor: "#F6F6F6",
    textAlign: "center",
    // height: 40,
    // width: "100%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: "row",
  },
  chatbox: {
    shadowColor: "#000000",
    flexDirection: "column",
    margin: 10,
    borderRadius: 5,
    elevation: 5,
  },
});
