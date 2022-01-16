import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import AppointmentList from "./AppointmentList";
import Signup1 from "./Signup1";
import { app, auth } from "../database/firebaseDB";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";

export default function Message({ navigation }) {
  //   const [coloricon, setColoricon] = useState("AppointmentList");
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.local.user);

  const openChat = (chatId) => {
    navigation.navigate("Chat", { chatId });
  };

  const getUserById = (userId) => {
    return users.filter((user) => user.uid == userId)[0];
  };

  const getDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  useEffect(() => {
    const allUsers = [];
    const subscriber1 = app
      .firestore()
      .collection("doctor")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.uid = doc.id;
          allUsers.push(data);
        });
      });

    const subscriber2 = app
      .firestore()
      .collection("user")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.uid = doc.id;
          allUsers.push(data);
        });
      });

    setUsers(allUsers);

    // Stop listening for updates when no longer required
    return () => {
      subscriber1();
      subscriber2();
    };
  }, []);

  useEffect(() => {
    const subscriber = app
      .firestore()
      .collection("chats")
      .where("members", "array-contains", auth.currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const allChats = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;

          let partnerId = data.members.filter(
            (uid) => uid != auth.currentUser.uid
          )[0];

          data.partnerInfo = getUserById(partnerId);

          allChats.push(data);
          // setChats((chat) => [...chat, data]);
        });
        setChats(allChats);

        if (loading) {
          setLoading(false);
        }
      });
    // Stop listening for updates when no longer required
    return () => {
      subscriber();
    };
  }, [users]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chats.sort((a, b) => b.lastTimestamp - a.lastTimestamp)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openChat(item.id)}>
            <View style={styles.box}>
              <View style={styles.section}>
                <Image
                  style={styles.img}
                  // source={require("../assets/profile_img.png")}
                  source={{
                    uri: item.partnerInfo.image,
                  }}
                />
              </View>
              <View style={[styles.section, { flex: 1 }]}>
                <Text style={styles.senderName}>
                  {item.partnerInfo.type == "doctor" && item.partnerInfo.title}{" "}
                  {item.partnerInfo.fullname}
                </Text>
                <Text style={styles.lastMsg} numberOfLines={2}>
                  {item.lastMessageText}
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.datetime}>
                  {getDateTime(item.lastTimestamp)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* {chats.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => openChat(item.id, item.partnerInfo)}
              key={item.id}
            >
              <View style={styles.box}>
                <View style={styles.section}>
                  <Image
                    style={styles.img}
                    source={require("../assets/profile_img.png")}
                  />
                </View>
                <View style={[styles.section, { flex: 1 }]}>
                  <Text style={styles.senderName}>
                    {item.partnerInfo.fullname}
                  </Text>
                  <Text style={styles.lastMsg} numberOfLines={1}>
                    {item.lastMessageText}
                  </Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.datetime}>
                    item.lastTimestamp.seconds
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    flexDirection: "row",
    borderBottomWidth: 0.15,
    borderBottomColor: "#A5A5A5",
    paddingVertical: 2,
  },
  section: {
    padding: 10,
  },
  senderName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  datetime: {
    color: "#A5A5A5",
  },
  lastMsg: {
    color: "#6F6F6F",
  },
  img: {
    width: 65,
    height: 65,
    resizeMode: "cover",
    alignSelf: "flex-end",
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
