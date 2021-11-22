import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { auth, app } from "../database/firebaseDB";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/actions/testAction";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        navigation.navigate("NavigationTabbar");
      })
      .catch((error) => alert(error.message));
  };

  const getUserInfo = (uid) => {
    //get user info
    let user = null;
    app
      .firestore()
      .collection("user")
      .doc(uid)
      .get()
      .then((res) => {
        user = res.data();
        user.uid = res.id;

        console.log("user", user);
      });
    return user;
  };

  const getDoctorInfo = async (uid) => {
    //get user info
    let doctor = null;
    await app
      .firestore()
      .collection("doctor")
      .doc(uid)
      .get()
      .then((res) => {
        doctor = res.data();
        doctor.uid = res.id;
      });
    return doctor;
  };

  useEffect(() => {
    const getUserInfo = async (uid) => {
      console.log("userId", uid);

      await app
        .firestore()
        .collection("user")
        .doc(uid)
        .get()
        .then((res) => {
          if (res.exists) {
            user = res.data();
            user.uid = res.id;

            dispatch(setUser(user));
          }
        });

      await app
        .firestore()
        .collection("doctor")
        .doc(uid)
        .get()
        .then((res) => {
          if (res.exists) {
            user = res.data();
            user.uid = res.id;

            dispatch(setUser(user));
          }
        });

      navigation.replace("NavigationTabbar");
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserInfo(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doc Doc</Text>
      <Text style={styles.username}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
      ></TextInput>
      <Text style={styles.password}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
      ></TextInput>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Forgetpassword");
        }}
      >
        <Text style={styles.forgetPassword}>forget password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleLogin}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Signup1");
        }}
      >
        <Text style={styles.dontHaveAccount}>Don’t have account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    color: "#32B5FF",
    fontWeight: "bold",
    fontSize: 72,
    marginBottom: 50,
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
  },

  username: {
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
  cupertinoButtonInfo: {
    marginTop: 50,
    height: 50,
    width: "100%",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  dontHaveAccount: {
    color: "#595959",
    textDecorationLine: "underline",
    height: 20,
    width: 130,
    marginTop: 15,
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

export default Signin;
