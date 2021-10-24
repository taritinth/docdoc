import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Index(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.appointment}>Appointment</Text>
      <Text style={styles.july}>July</Text>

      <View style={styles.rect}>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <View style={styles.buttondate}>
            <Text style={styles.buttonText}>Sun</Text>
            <Text style={styles.buttonText}>1</Text>
          </View>
          <View style={styles.buttondate}>
            <Text style={styles.buttonText}>Mon</Text>
            <Text style={styles.buttonText}>2</Text>
          </View>
          <View style={styles.buttondate}>
            <Text style={styles.buttonText}>Tue</Text>
            <Text style={styles.buttonText}>3</Text>
          </View>
          <View style={styles.buttondate}>
            <Text style={styles.buttonText}>Wed</Text>
            <Text style={styles.buttonText}>4</Text>
          </View>
          <View style={styles.buttondate}>
            <Text style={styles.buttonText}>Thu</Text>
            <Text style={styles.buttonText}>5</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.morningSlots}>Morning Slots</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>10.00 a.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>10.30 a.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>11.00 a.m.</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>11.30 a.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>12.00 a.m.</Text>
        </View>
        <View style={styles.buttonContainer2}>
          <Text style={styles.buttonText}></Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.afternoonSlots}>Afternoon Slots</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>01.00 p.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>01.30 p.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>02.00 p.m.</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>02.30 p.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>03.00 p.m.</Text>
        </View>
        <View style={styles.buttonContainer2}>
          <Text style={styles.buttonText}></Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} activeOpacity={0.8}>
        <View style={styles.button3}>
          <Text style={styles.buttonText2}>Comfirm Appointment</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 20,
    flex: 1,
  },
  rect: {
    width: "100%",
    height: 90,
    marginTop: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  appointment: {
    fontFamily: "open-sans",
    color: "#121212",
    fontSize: 22,
    marginTop: 1,
    marginLeft: 41,
  },

  morningSlots: {
    fontFamily: "open-sans",
    color: "#121212",
    fontSize: 17,
    marginTop: 50,
    marginLeft: 2,
    marginBottom: 10,
  },
  afternoonSlots: {
    fontFamily: "open-sans",
    color: "#121212",
    fontSize: 17,
    marginTop: 30,
    marginLeft: 2,
  },
  button: {
    alignSelf: "stretch",
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    backgroundColor: "#ffffff",
    width: 110,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer2: {
    backgroundColor: "#ffffff",
    width: 110,
  },

  buttonText: {
    color: "BLACK",
    fontFamily: "open-sans",
    fontSize: 16,
  },

  button2: {
    alignSelf: "stretch",
    marginTop: 50,
    marginBottom: 5,
  },

  button3: {
    backgroundColor: "#32B5FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText2: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },

  july: {
    fontFamily: "open-sans",
    color: "#121212",
    fontSize: 20,
    marginTop: 40,
  },
  buttondate: {
    backgroundColor: "#ffff",
    width: 60,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 70,
    marginBottom: 7,
    marginLeft: 5,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
