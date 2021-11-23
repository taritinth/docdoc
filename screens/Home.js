import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacityBase,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearch, setDebounceSearch] = useState(null);

  const handleSearch = async (value) => {
    setSearchTerm(value);

    clearTimeout(debounceSearch);
    setDebounceSearch(
      setTimeout(async () => {
        let getDoctors = await app.firestore().collection("doctor");

        if (value) {
          getDoctors = getDoctors.where(
            "nameAsArray",
            "array-contains",
            value.toLowerCase()
          );
        }

        getDoctors.get().then((querySnapshot) => {
          const allDoctors = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            data.uid = doc.id;
            allDoctors.push(data);
          });
          setDoctors(allDoctors);
        });
      }, 500)
    );
  };

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
    const subscriber = app
      .firestore()
      .collection("doctor")
      .onSnapshot((querySnapshot) => {
        const allDoctors = [];
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
      {/* <Text>home</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Appointment2")}>
        <Text>Appointment</Text>
      </TouchableOpacity> */}
      {user.type != "doctor" ? (
        <ScrollView>
          <View style={[styles.searchSection]}>
            <MaterialIcons
              name="search"
              size={29}
              color="#CBCBCB"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={styles.input}
              value={searchTerm}
              onChangeText={(value) => handleSearch(value)}
              placeholder="ค้นหาแพทย์"
            ></TextInput>
          </View>

          <View
            style={{
              paddingHorizontal: 15,
              flex: 1,
              marginVertical: 15,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                color: "#525252",
              }}
            >
              รายชื่อแพทย์
            </Text>
          </View>
          {doctors.map((doctor, index) => (
            <TouchableOpacity
              activeOpacity={1}
              key={doctor.uid}
              onPress={() => {
                navigation.navigate("OtherProfile", {
                  otherUid: doctor.uid,
                });
              }}
            >
              <View style={styles.box} key={index}>
                <View style={styles.appointment} key={doctor.uid}>
                  <Image
                    style={styles.img}
                    source={{
                      uri: doctor.image,
                    }}
                  />
                  <View style={styles.doctordetail}>
                    <Text style={styles.name}>
                      {doctor.title} {doctor.fullname}
                    </Text>
                    <Text style={styles.type}>{doctor.specialist}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <MaterialIcons
                        name="location-on"
                        size={14}
                        color="#D7D7D7"
                        style={{ marginTop: 4 }}
                      />
                      <Text style={styles.place}> {doctor.workplace}</Text>
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
                    size={20}
                    color="#8A8A8A"
                  />
                  <Text
                    style={{
                      color: "#8A8A8A",
                      fontWeight: "bold",
                      marginVertical: 10,
                    }}
                  >
                    {" "}
                    แชท
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View></View>
      )}
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
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    height: 50,
    marginTop: 10,
    marginHorizontal: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  // box: {
  //   flexDirection: "row",
  //   borderBottomWidth: 0.15,
  //   borderBottomColor: "#A5A5A5",
  //   paddingVertical: 2,
  // },
  appointment: {
    flexWrap: "wrap",
    backgroundColor: "#ffffffff",
    flexDirection: "row",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 5,
  },
  appointmentdetail: {
    // flex: 1,
    padding: 10,
    width: "33%",
  },
  img: {
    width: 75,
    height: 75,
    resizeMode: "cover",
    alignSelf: "flex-end",
    borderRadius: 150 / 2,
    overflow: "hidden",
    margin: 20,
  },
  name: {
    fontSize: 18,
    marginTop: 10,
    color: "#525252",
    fontWeight: "bold",
  },
  doctordetail: {
    flexDirection: "column",
  },
  type: {
    alignSelf: "flex-start",
    backgroundColor: "#E3F2FF",
    color: "#41698E",
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
  place: {
    fontSize: 14,
    marginBottom: 10,
    color: "#6F6F6F",
  },
  chat: {
    backgroundColor: "#F6F6F6",
    textAlign: "center",
    // height: 40,
    // width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
  },
  box: {
    shadowColor: "#000000",
    flexDirection: "column",
    borderWidth: 0.05,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: "#6F6F6F",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});
