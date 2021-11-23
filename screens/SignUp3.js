import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { auth, app, storage } from "../database/firebaseDB";
import RNPasswordStrengthMeter from "react-native-password-strength-meter";

const SignUp3 = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [disease, setDisease] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const onChange = (
    password2,
    score,
    { label, labelColor, activeBarColor }
  ) => {
    console.log(password2, score, { label, labelColor, activeBarColor });
    setPassword(password2);
    console.log(password);
  };

  useEffect(() => {
    setName(route.params.fullname);
    setPhone(route.params.phone);
    setImage(route.params.image);
    setAge(route.params.age);
    setWeight(route.params.weight);
    setHeight(route.params.height)
    setDisease(route.params.disease);
    console.log(route.params);
  }, []);

  const handleSignUp = async () => {
    console.log(image);
    let imagepath = image.substring(image.lastIndexOf("/") + 1);
    console.log(imagepath);
    const response = await fetch(image);
    const blob = await response.blob();
    const reference = storage.ref().child(imagepath);
    await reference.put(blob);

    let imageUrl = "";
      await storage
        .ref(imagepath)
        .getDownloadURL()
        .then((url) => {
          imageUrl = url;
        });


    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        const c = name.toLowerCase();

        var array = [];
        for (let i = 1; i < c.length + 1; i++) {
          array.push(c.substring(0, i));
        }

        app.firestore().collection("user").doc(user.uid).set({
          email: user.email,
          phone: phone,
          fullname: name,
          image: imageUrl,
          dateOfBirth: age,
          weight: weight,
          height:height,
          disease: disease,
          nameAsArray: array,
          type: "user",
        });
        console.log(user.uid);
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.email}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      {/* <Text style={styles.password}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        placeholder="Username"
      ></TextInput> */}

      <Text style={styles.password}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
      ></TextInput>
      {/* <View style={styles.input}>
        <RNPasswordStrengthMeter onChangeText={onChange} meterType="bar" />
      </View> */}
      <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.button, styles.buttonContainer]}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Signup2")}
        style={[styles.button, styles.buttonContainer]}
      >
        <Text style={styles.buttonText}>BACK</Text>
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
  title: {
    color: "#525252",
    fontWeight: "bold",
    fontSize: 40,
    marginLeft: 10,
    marginBottom: 110,
    marginBottom: 50,
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
  email: {
    fontSize: 18,
    marginLeft: 10,
    color: "#595959",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  password: {
    fontSize: 18,
    marginLeft: 10,
    color: "#595959",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 25,
  },
  forgetPassword: {
    marginTop: 10,
    color: "#595959",
    alignSelf: "flex-end",
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
});
export default SignUp3;
