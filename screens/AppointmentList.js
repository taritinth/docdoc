import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function AppointmentList(props) {
  const [listappointment, setlistappointment] = useState([1, 2, 3, 4, 5, 6]);
  const [ispress, setispress] = useState(true);
  //   setlistappointment();

  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="AppointmentList">
    //     <Stack.Screen
    //       name="AppointmentList"
    //       options={{
    //         title: "AppointmentList",
    //         headerStyle: { backgroundColor: "orange" },
    //       }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <View style={styles.container}>
      <View style={styles.toolbars}>
        <TouchableOpacity
          style={(styles.upcoming, !ispress ? styles.btnpress : 0)}
          onPress={() => {
            return setispress(false);
          }}
        >
          <Text style={styles.textupcoming}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(styles.history, ispress ? styles.btnpress : 0)}
          onPress={() => {
            return setispress(true);
          }}
        >
          <Text style={styles.texthistory}>History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {listappointment.map((element) => {
          return (
            <View style={styles.appointment} key={element}>
              <View style={styles.appointmentdetail}>
                <Text>Date</Text>
                <Text>3 June 2021</Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Time</Text>
                <Text>10.30 am</Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Doctor</Text>
                <Text>Dr.JimRoBo</Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Type</Text>
                <Text>RoBo</Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Place</Text>
                <Text>Robo Center</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    // padding: 30,
    // flexDirection: "row",
  },
  btnpress: {
    borderBottomColor: "#32B5FF",
    borderBottomWidth: 5,
  },
  toolbars: {
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  upcoming: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffffff",
    // alignSelf: "stretch",
  },
  history: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffffff",
    alignSelf: "stretch",
  },
  appointment: {
    flexWrap: "wrap",
    margin: 10,
    backgroundColor: "#ffffffff",
    borderRadius: 4,
    flexDirection: "row",
    shadowColor: "#000000",
    elevation: 8,
  },
  textupcoming: {
    fontSize: 24,
  },
  texthistory: {
    fontSize: 24,
  },
  appointmentdetail: {
    // flex: 1,
    padding: 10,
    width: "33%",
  },
});
