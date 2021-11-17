import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
  Button,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
// import MapView, { Marker } from "react-native-maps";
import { app, auth } from "../database/firebaseDB";
// import * as firebase from "firebase";
import Loading from "../components/Loading";

const Chat = ({ route, navigation }) => {
  const [inputMethod, setInputMethod] = useState("text");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [scrollView, setScrollView] = useState(null);
  const [loading, setLoading] = useState(true);

  const { chatId, partnerInfo } = route.params;

  useEffect(() => {
    const subscriber = app
      .firestore()
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("timestamp", "asc") // Sorted by date in ascending direction
      .onSnapshot((querySnapshot) => {
        let chatMessages = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          chatMessages.push(data);
        });
        if (loading) {
          setLoading(false);
        }

        setMessages(chatMessages);
      });

    navigation.setOptions({ title: "Unknown" });

    return () => {
      subscriber();
    };
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const onPressImage = () => {
    if (inputMethod == "image") {
      setInputMethod("text");
      return;
    }

    Keyboard.dismiss();

    setTimeout(() => {
      setInputMethod("image");
    }, 100);
  };

  const onPressCalendar = () => {
    if (inputMethod == "calendar") {
      setInputMethod("text");
      return;
    }

    Keyboard.dismiss();

    setTimeout(() => {
      setInputMethod("calendar");
    }, 100);
  };

  const onFocusTextInput = () => {
    setInputMethod("text");
  };

  const handleTyping = (value) => {
    setText(value);
  };

  const onPressSendMessage = () => {
    if (text) {
      // let msgObj = { id: Date.now(), type: "text", message: text };

      // Get a new write batch
      // var batch = app.firestore().batch();

      // var ref1 = app
      //   .firestore()
      //   .collection("chats")
      //   .doc(chatId)
      //   .collection("messages");

      // batch.add(ref1, {
      //   type: inputMethod,
      //   sentBy: auth.currentUser.uid,
      //   messageText: text,
      //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // });

      // var ref2 = app.firestore().collection("chats").doc(chatId);

      // batch.update(ref2, {
      //   lastMessageType: inputMethod,
      //   lastSentBy: auth.currentUser.uid,
      //   lastMessageText: text,
      //   lastTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // });

      // // Commit the batch
      // batch.commit().then(function () {
      //   setText("");
      // });

      const timestamp = new Date().getTime();

      app
        .firestore()
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .add({
          type: inputMethod,
          sentBy: auth.currentUser.uid,
          messageText: text,
          timestamp: timestamp,
        })
        .then((docRef) => {
          app
            .firestore()
            .collection("chats")
            .doc(chatId)
            .update({
              lastMessageId: docRef.id,
              lastMessageType: inputMethod,
              lastSentBy: auth.currentUser.uid,
              lastMessageText: text,
              lastTimestamp: timestamp,
            })
            .then((res) => {
              setText("");
            });
        });
    }
  };

  const handleLongPress = (msgId) => {
    Alert.alert(
      "Delete message?",
      "Are you sure to permanently delete this message?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const delSubjDoc = app
              .firestore()
              .collection("chats")
              .doc(chatId)
              .collection("messages")
              .doc(msgId);
            delSubjDoc.delete().then((res) => {});
          },
        },
      ]
    );
  };

  const renderMessages = () => {
    return (
      <View style={styles.content}>
        <ScrollView
          ref={(ref) => {
            setScrollView(ref);
          }}
          onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => {
            switch (msg.type) {
              case "text":
                return (
                  <TouchableOpacity
                    style={
                      msg.sentBy == auth.currentUser.uid
                        ? styles.myChatBubble
                        : styles.otherChatBubble
                    }
                    key={msg.id}
                    activeOpacity={0.9}
                    onLongPress={() => handleLongPress(msg.id)}
                  >
                    <Text
                      style={
                        msg.sentBy == auth.currentUser.uid
                          ? styles.myChatText
                          : styles.otherChatText
                      }
                    >
                      {msg.messageText}
                    </Text>
                  </TouchableOpacity>
                );
              case "image":
                break;
              default:
                break;
            }
          })}
        </ScrollView>
      </View>
    );
  };

  const renderInputMethodEditor = () => {
    switch (inputMethod) {
      case "image":
        return (
          <View style={styles.inputMethodEditor}>
            <Text>image</Text>
          </View>
        );
      case "calendar":
        return (
          <View style={styles.inputMethodEditor}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Appointment2", {
                  appointmented: "fdsUMdSk22QtffilTDnS",
                })
              }
            >
              <Text>Appointment</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        break;
    }
  };

  const renderToolbar = () => {
    return (
      <View style={styles.toolbar}>
        <View style={styles.toolbarContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.toolbarItem}
            onPress={() => onPressImage()}
          >
            <Icon name={"image"} size={22} color={"#ced4da"} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.toolbarItem}
            onPress={() => onPressCalendar()}
          >
            <Icon name={"calendar"} size={22} color={"#ced4da"} />
          </TouchableOpacity>
          <TextInput
            value={text}
            style={[styles.input, styles.toolbarItem]}
            placeholder="Type Something!"
            onChangeText={handleTyping}
            onFocus={onFocusTextInput}
            returnKeyType={"done"}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.toolbarItem}
            onPress={() => onPressSendMessage()}
          >
            <Icon name={"paper-plane"} size={22} color={"#ced4da"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {renderMessages()}
      {renderToolbar()}
      {renderInputMethodEditor()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  inputMethodEditor: {
    height: 282,
    backgroundColor: "white",
  },
  toolbar: {
    borderTopWidth: 0.5,
    borderTopColor: "#e2e2e2",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
  },
  toolbarContainer: {
    flexDirection: "row",
  },
  toolbarItem: {
    marginHorizontal: 5,
    justifyContent: "center",
  },
  input: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  otherChatBubble: {
    alignSelf: "flex-start",
    maxWidth: "70%",
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  myChatBubble: {
    alignSelf: "flex-end",
    maxWidth: "70%",
    backgroundColor: "#0a95ff",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  otherChatText: {
    color: "black",
  },
  myChatText: {
    color: "white",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
  },
  map: {
    width: 210,
    height: 210,
  },
  button: {
    backgroundColor: "#0a95ff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});

export default Chat;
