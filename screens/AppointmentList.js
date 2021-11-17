import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { app } from "../database/firebaseDB";

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Upcoming" },
    { key: "second", title: "History" },
  ]);
  const [listAppointment, setListAppointment] = useState([1, 2, 3, 4, 5, 6]);
  let unsubscribe, unsubscribedoctor;
  const subjCollection = app.firestore().collection("appointment");
  const subjCollectiondoctor = app
    .firestore()
    .collection("doctor")
    .doc("fdsUMdSk22QtffilTDnS");
  // const [month, setMonth] = useState(""); // 0-11
  // const [year, setYear] = useState("");
  // const [date, setDate] = useState("");
  // const [time, setTime] = useState("");
  const datenow = new Date().getDate();
  const [appointmenter, setAppointmenter] = useState("qknN4caIqdpf1izJVwHO");
  const [appointmented, setAppointmented] = useState("fdsUMdSk22QtffilTDnS");

  const [listinfoappoint, setListinfoappoint] = useState([]);
  const [listinhistory, setListinhistory] = useState([]);
  const [listdoc, setListdoc] = useState("");

  const [months, setMonths] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  const getCollection = (querySnapshot) => {
    const all_data = [];
    querySnapshot.forEach((res) => {
      const { time, month, year, date, appointmented, appointmenter } =
        res.data();
      all_data.push({
        appointmenter,
        appointmented,
        month,
        year,
        date,
        time,
      });
    });
    // sort by ????
    all_data.sort((item2, item1) => {
      return (
        item1.date < item2.date &&
        months.findIndex((element) => element == item1.month) <=
          months.findIndex((element) => element == item2.month)
      );
      // console.log(item2);
    });
    // console.log(all_data);
    setListinfoappoint(
      all_data.filter(
        (data) =>
          data.appointmenter == appointmenter &&
          data.appointmented == appointmented &&
          data.date >= datenow &&
          months.findIndex((element) => element == data.month) >=
            new Date().getMonth()
      )
    );

    setListinhistory(
      all_data.filter(
        (data) =>
          data.appointmenter == appointmenter &&
          data.appointmented == appointmented &&
          months.findIndex((element) => element == data.month) <
            new Date().getMonth()
      )
    );
    // console.log(listinfoappoint);
  };

  useEffect(() => {
    // Update the document title using the browser API
    unsubscribe = subjCollection.onSnapshot(getCollection);
    subjCollectiondoctor.get().then((res) => {
      // console.log("tuu");
      setListdoc(res.data());
      // console.log(listdoc);
    });
  }, []);

  const FirstRoute = () => (
    <View style={styles.container}>
      <ScrollView>
        {listinfoappoint.map((element, index) => {
          return (
            <View style={styles.appointment} key={index}>
              <View style={styles.appointmentdetail}>
                <Text>Date</Text>
                <Text>
                  {element.date} {element.month} {element.year}
                </Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Time</Text>
                <Text>{element.time}</Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Doctor</Text>
                <Text>{listdoc.name}</Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Type</Text>
                <Text>{listdoc.type}</Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Place</Text>
                <Text>{listdoc.place}</Text>
              </View>
              {datenow + 1 <= element.date ? (
                <TouchableOpacity style={[styles.appointmentdetail]}>
                  <Text style={styles.cancel}>Cancel</Text>
                </TouchableOpacity>
              ) : (
                <View style={[styles.appointmentdetail]}>
                  <Text style={styles.noncancel}>Cancel</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );

  const SecondRoute = () => (
    <View style={styles.container}>
      <ScrollView>
        {listinhistory.map((element, index) => {
          return (
            <View style={styles.appointment} key={index}>
              <View style={styles.appointmentdetail}>
                <Text>Date</Text>
                <Text>
                  {element.date} {element.month} {element.year}
                </Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Time</Text>
                <Text>{element.time}</Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Doctor</Text>
                <Text>{listdoc.name}</Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Type</Text>
                <Text>{listdoc.type}</Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Place</Text>
                <Text>{listdoc.place}</Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Status</Text>
                <Text style={{ color: "green" }}>treated</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#32B5FF" }}
      style={{ backgroundColor: "white" }}
      activeColor="black"
      inactiveColor="#A8A8A8"
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
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
  cancel: {
    color: "red",
    padding: 10,
    textAlign: "center",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
  },
  noncancel: {
    color: "gray",
    padding: 10,
    textAlign: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
});
