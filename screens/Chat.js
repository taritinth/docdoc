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
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
// import MapView, { Marker } from "react-native-maps";

const Chat = ({ navigation }) => {
  let [inputMethod, setInputMethod] = useState("text");
  let [text, setText] = useState("");
  let [messages, setMessages] = useState("");
  let [scrollView, setScrollView] = useState(null);

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

  const onFocusTextInput = () => {
    setInputMethod("text");
  };

  const handleTyping = (value) => {
    setText(value);
  };

  const onPressSendMessage = () => {
    if (text) {
      let msgObj = { id: Date.now(), type: "text", message: text };

      setText("");
      setMessages((messages) => [...messages, msgObj]);
    }
  };

  const handleLongPress = (id) => {
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
            setMessages(messages.filter((msg) => msg.id != id));
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
                    style={[
                      styles.myChatBubble,
                      { backgroundColor: "#0a95ff" },
                    ]}
                    key={msg.id}
                    activeOpacity={0.9}
                    onLongPress={() => handleLongPress(msg.id)}
                  >
                    <Text style={[styles.myChatText]}>{msg.message}</Text>
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
  },
  inputMethodEditor: {
    height: 282,
    backgroundColor: "white",
  },
  toolbar: {
    borderTopWidth: 1,
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
    borderWidth: 1,
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
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 10,
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
