// "use strict";

import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useValidation } from "react-native-form-validator";
import DatePicker from "react-native-datepicker";

const SignUp2 = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  // const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [disease, setDisease] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setName(route.params.fullname);
    setPhone(route.params.phone);
    setImage(route.params.image.localUri);
  }, []);

  function nextpage() {
    console.log(date);
    navigation.navigate("Signup3", {
      fullname: name,
      phone: phone,
      image: image,
      age: date.toLocaleString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      weight: weight,
      height: height,
      disease: disease,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.fullname}>Date Of Birth</Text>

      <DatePicker
        style={styles.datePickerStyle}
        date={date} // Initial date from state
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
          },
        }}
        onDateChange={(date) => {
          setDate(date);
          console.log(date);
        }}
      />

      <Text style={styles.phone}>Weight</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight"
        onChangeText={(text) => {
          setWeight(text);
        }}
      ></TextInput>

      <Text style={styles.phone}>Height</Text>
      <TextInput
        style={styles.input}
        placeholder="Height"
        onChangeText={(text) => {
          setHeight(text);
        }}
      ></TextInput>

      <Text style={styles.phone}>Disease</Text>
      <TextInput
        style={styles.input}
        placeholder="Disease"
        onChangeText={(text) => {
          setDisease(text);
        }}
      ></TextInput>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => nextpage()}
      >
        <View
          style={[
            styles.buttonContainer,
            { backgroundColor: "#32B5FF", marginTop: 40 },
          ]}
        >
          <Text style={styles.buttonText}>Next</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Signup1")}
        style={[
          styles.button,
          styles.buttonContainer,
          { backgroundColor: "#F6F6F6", marginTop: 15 },
        ]}
      >
        <Text style={[styles.buttonText, { color: "#595959" }]}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  image: {
    zIndex: 1,
    top: -80,
  },
  title: {
    color: "#525252",
    fontWeight: "bold",
    fontSize: 40,
    marginLeft: 10,
    marginBottom: 110,
    alignSelf: "flex-start",
  },
  input: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  iserror: {
    borderWidth: 1,
    borderColor: "red",
  },
  fullname: {
    fontSize: 18,
    marginLeft: 10,
    color: "#595959",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  phone: {
    fontSize: 18,
    marginLeft: 10,
    color: "#595959",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 25,
  },
  profileimg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    alignSelf: "center",
  },
  datePickerStyle: {
    width: "100%",
    marginTop: 20,
  },

  button: {
    alignSelf: "stretch",
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
export default SignUp2;
