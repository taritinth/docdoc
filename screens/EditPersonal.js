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
import {
  FontAwesome5,
  Ionicons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { app, auth, storage } from "../database/firebaseDB";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import DatePicker from "react-native-datepicker";

const EditPersonal = ({ navigation }) => {
  const [title, changeTitle] = useState("");
  const [phone, changePhone] = useState("");
  const [fullname, changeFullname] = useState("");
  const [image, changeImage] = useState("");
  const [email, changeEmail] = useState("");
  const [image2, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [disease, setDisease] = useState("");
  const [date, setDate] = useState(new Date());

  const [specialist, setSpecialist] = useState("");
  const [workplace, setWorkplace] = useState("");

  const user = useSelector((state) => state.local.user);
  let colName = user.type == "doctor" ? "doctor" : "user";

  const subjCollection = app
    .firestore()
    .collection(colName)
    .doc(auth.currentUser.uid);

  // const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setLoading(true);

    subjCollection.get().then((res) => {
      const data = res.data();

      // changeUsername(data.username);
      if (user.type == "doctor") {
        setWorkplace(data.workplace);
        setSpecialist(data.specialist);
      } else {
        setDateOfBirth(new Date(data.dateOfBirth));
        setWeight(data.weight);
        setHeight(data.height);
        setDisease(data.disease);
      }

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  const editPersonal = async () => {
    if (user.type == "user") {
      app
        .firestore()
        .collection("user")
        .doc(auth.currentUser.uid)
        .update({
          dateOfBirth: dateOfBirth.toLocaleString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }),
          weight: weight,
          height: height,
          disease: disease,
        });
    } else {
      app.firestore().collection("doctor").doc(auth.currentUser.uid).update({
        workplace: workplace,
        specialist: specialist,
      });
    }
    navigation.navigate("Profile");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {user.type == "doctor" && <Text style={styles.label}>Specialist</Text>}
      {user.type == "doctor" && (
        <TextInput
          value={specialist}
          style={styles.input}
          placeholder="Specialist"
          onChangeText={(text) => {
            setSpecialist(text);
          }}
        ></TextInput>
      )}

      {user.type == "doctor" && <Text style={styles.label}>Workplace</Text>}
      {user.type == "doctor" && (
        <TextInput
          value={workplace}
          style={styles.input}
          placeholder="Workplace"
          onChangeText={(text) => {
            setWorkplace(text);
          }}
        ></TextInput>
      )}

      {user.type == "user" && <Text style={styles.label}>Date Of Birth</Text>}
      {user.type == "user" && (
        <DatePicker
          style={styles.datePickerStyle}
          date={dateOfBirth} // Initial date from state
          format="YYYY-MM-DD"
          placeholder="select date"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              flex: 1,
              backgroundColor: "#F6F6F6",
              alignItems: "flex-start",
              height: 50,
              paddingVertical: 5,
              paddingHorizontal: 30,
              borderWidth: 0,
              borderRadius: 30,
              marginBottom: 15,
            },
          }}
          onDateChange={(date) => {
            setDateOfBirth(date);
            console.log(date);
          }}
        />
      )}

      {user.type == "user" && <Text style={styles.label}>Weight</Text>}
      {user.type == "user" && (
        <TextInput
          value={weight}
          style={styles.input}
          placeholder="Weight"
          onChangeText={(text) => {
            setWeight(text);
          }}
        ></TextInput>
      )}

      {user.type == "user" && <Text style={styles.label}>Height</Text>}
      {user.type == "user" && (
        <TextInput
          value={height}
          style={styles.input}
          placeholder="Height"
          onChangeText={(text) => {
            setHeight(text);
          }}
        ></TextInput>
      )}

      {user.type == "user" && <Text style={styles.label}>Disease</Text>}
      {user.type == "user" && (
        <TextInput
          value={disease}
          style={styles.input}
          placeholder="Disease"
          onChangeText={(text) => {
            setDisease(text);
          }}
        ></TextInput>
      )}

      {/* <View style={styles}>
        <Ionicons name="person-outline" size={24} color="black" />
        <TextInput
          style={styles.profile}
          placeholder="Username"
          value={username}
          onChangeText={(text) => changeUsername(text)}
        ></TextInput>
      </View>
      <View style={styles}>
        <Feather name="phone" size={24} color="black" />
        <TextInput
          style={styles.profile}
          placeholder="Phonenumber"
          value={phone}
          onChangeText={(text) => changePhone(text)}
        ></TextInput>
      </View>
      <View style={styles}>
        <FontAwesome name="key" size={24} color="black" />
        <TextInput
          style={styles.profile}
          placeholder="fullname"
          value={fullname}
          onChangeText={(text) => changeFullname(text)}
        ></TextInput>
      </View> */}
      {/* <TouchableOpacity>
        <Text style={styles}></Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={editPersonal}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>SAVE</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("NavigationTabbar");
        }}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>BACK</Text>
        </View>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={editPersonal}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Save</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 30,
    backgroundColor: "white",
  },
  image: {
    marginTop: 25,
    marginBottom: 10,
  },

  // editprofile: {
  //   display: "inline",
  // },
  profileimg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    alignSelf: "center",
  },
  profile: {
    fontSize: 18,
    borderBottomWidth: 2,
    position: "relative",
    marginLeft: 10,
  },
  // button: {
  //   alignSelf: "center",
  //   marginTop: 20,
  // },
  editImgButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#32B5FF",
    flexDirection: "row-reverse",
    right: 0,
    bottom: 0,
    position: "absolute",
    borderWidth: 2,
    borderColor: "white",
  },
  button: {
    alignSelf: "stretch",
    marginTop: 40,
  },
  buttonContainer: {
    backgroundColor: "#32B5FF",
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
  editprofile: {
    flexDirection: "row-reverse",
    right: 0,
    bottom: 0,
    position: "absolute",
  },
  input: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#F6F6F6",
    height: 50,
    // borderWidth: 1,
    // borderColor: "#d3d3d3",
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 15,
  },
  datePickerStyle: {
    width: "100%",
    marginTop: 20,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    color: "#595959",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
});

export default EditPersonal;
