import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Index(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.appointment}>Appointment</Text>
      <TouchableOpacity
        style={[styles.button, , { marginLeft: 20 }]}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          July
          {"  "}
          {/* <Icon name={"location-arrow"} size={22} color={"white"} /> */}
        </Text>
      </TouchableOpacity>

      <View style={styles.rect}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={[styles.buttondate, { marginLeft: 25 }]}>
            <Text style={[styles.buttonText, { fontWeight: "bold" }]}>Sun</Text>
            <Text style={styles.buttonText}>1</Text>
          </View>
          <View style={[styles.buttondate, { backgroundColor: "#32B5FF" }]}>
            <Text style={[styles.buttonText, { fontWeight: "bold" }]}>Mon</Text>
            <Text style={styles.buttonText}>2</Text>
          </View>
          <View style={styles.buttondate}>
            <Text style={[styles.buttonText, { fontWeight: "bold" }]}>Tue</Text>
            <Text style={styles.buttonText}>3</Text>
          </View>
          <View style={styles.buttondate}>
            <Text style={[styles.buttonText, { fontWeight: "bold" }]}>Wed</Text>
            <Text style={styles.buttonText}>4</Text>
          </View>
          <View style={styles.buttondate}>
            <Text style={[styles.buttonText, { fontWeight: "bold" }]}>Thu</Text>
            <Text style={styles.buttonText}>5</Text>
          </View>
          <View style={styles.buttondate}>
            <Text style={[styles.buttonText, { fontWeight: "bold" }]}>Fri</Text>
            <Text style={styles.buttonText}>5</Text>
          </View>
          <View style={styles.buttondate}>
            <Text style={[styles.buttonText, { fontWeight: "bold" }]}>Sat</Text>
            <Text style={styles.buttonText}>5</Text>
          </View>
        </ScrollView>
      </View>

      <Text style={styles.morningSlots}>Morning Slots</Text>
      <View style={styles.buttons} activeOpacity={0.8}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>10.00 a.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>10.30 a.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>11.00 a.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>11.30 a.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>12.00 a.m.</Text>
        </View>
      </View>

      <Text style={styles.afternoonSlots}>Afternoon Slots</Text>
      <View style={styles.buttons} activeOpacity={0.8}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>01.00 p.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>01.30 p.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>02.00 p.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>02.30 p.m.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>03.00 p.m.</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button3} activeOpacity={0.8}>
        <Text style={styles.buttonText2}>Comfirm Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    // margin: 20,
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  rect: {
    marginTop: 20,
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  appointment: {
    color: "#121212",
    fontSize: 22,
    marginTop: 1,
    marginLeft: 41,
  },

  morningSlots: {
    paddingHorizontal: 20,
    color: "#121212",
    fontSize: 17,
    marginTop: 30,
    marginLeft: 2,
    marginBottom: 10,
  },
  afternoonSlots: {
    paddingHorizontal: 20,
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
  buttons: {
    flexWrap: "wrap",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    backgroundColor: "#ffffff",
    width: "30%",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer2: {
    backgroundColor: "#ffffff",
    width: 110,
  },

  buttonText: {
    color: "black",

    fontSize: 14,
  },

  button2: {
    alignSelf: "stretch",
    marginTop: 50,
    marginBottom: 5,
  },

  button3: {
    marginTop: 120,
    marginHorizontal: 20,
    backgroundColor: "#32B5FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    // alignSelf: "flex-end",
  },
  buttonText2: {
    color: "white",

    fontSize: 18,
  },

  july: {
    color: "#121212",
    fontSize: 20,
    marginTop: 40,
  },
  buttondate: {
    backgroundColor: "#ffff",
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    elevation: 3,
    height: 85,
    // marginBottom: 7,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
