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

    senderId = auth.currentUser.uid;
    receiverId = partnerInfo.uid;
    chatDocId = generateDocId(senderId, receiverId);
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
          {doctors.map((doctor) => (
            <View style={styles.appointment} key={doctor.uid}>
              <View>
                <Text>{doctor.fullname}</Text>
              </View>
              <View>
                <Button title="แชท" onPress={() => setOneToOneChat(doctor)} />
              </View>
            </View>
            // <View style={styles.box} key={doctor.uid}>
            //   <View>
            //     <Image
            //       source={{
            //         uri: doctor.image,
            //       }}
            //     />
            //   </View>
            //   <View style={[{ flex: 1 }]}>
            //     <Text>{doctor.fullname}</Text>
            //   </View>
            // </View>
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
    margin: 10,
    backgroundColor: "#ffffffff",
    borderRadius: 4,
    flexDirection: "row",
    shadowColor: "#000000",
    elevation: 8,
  },
  appointmentdetail: {
    // flex: 1,
    padding: 10,
    width: "33%",
  },
});
