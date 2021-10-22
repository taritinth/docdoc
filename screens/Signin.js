import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";

function Signin(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.docDoc}>Doc Doc</Text>
            <View style={styles.rect}></View>
            <View style={styles.rect1}></View>
            <Text style={styles.username}>Username</Text>
            <Text style={styles.password}>Password</Text>
            <Text style={styles.forgetPassword}>forget password?</Text>
            <TouchableOpacity style={styles.cupertinoButtonInfo} ><Text style={styles.signin}>Sign In</Text></TouchableOpacity>
            <Text style={styles.dontHaveAccount}>Don’t have account?</Text>
        </View>
    );
}

export default Signin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'red',
        alignItems: "center",

    },
    docDoc: {
        color: "#121212",
        fontSize: 72,
        marginTop: 110,
    },
    rect: {
        width: 270,
        height: 45,
        backgroundColor: "#E6E6E6",
        marginTop: 90,
    },
    rect1: {
        width: 270,
        height: 45,
        backgroundColor: "#E6E6E6",
        marginTop: 50,
    },
    username: {
        color: "#121212",
        marginTop: -170,
    },
    password: {
        color: "#121212",
        marginTop: 80,
    },
    forgetPassword: {
        color: "#121212",
        marginTop: 75,

    },
    cupertinoButtonInfo: {
        height: 50,
        width: 280,
        marginTop: 120,

        backgroundColor: "blue",
    },
    dontHaveAccount: {
        color: "#121212",
        height: 20,
        width: 130,
        marginTop: 15,

    },
    signin: {
        color: "#FFFFFF",
        alignItems: "center",
    }
});

