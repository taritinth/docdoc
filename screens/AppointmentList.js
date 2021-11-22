import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
  FlatList,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { app, auth } from "../database/firebaseDB";
import Loading from "../components/Loading";

export default function TabViewExample({ navigation }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Upcoming" },
    { key: "second", title: "History" },
  ]);
  const [listAppointment, setListAppointment] = useState([]);
  // let unsubscribe, unsubscribedoctor;
  const subjCollection = app
    .firestore()
    .collection("appointment")
    .where("group", "array-contains", auth.currentUser.uid);
  const subjCollectiondoctor = app.firestore().collection("doctor");
  const datenow = new Date().getDate();
  const [appointmenter, setAppointmenter] = useState();
  // const [appointmented, setAppointmented] = useState("fdsUMdSk22QtffilTDnS");

  const [listinfoappoint, setListinfoappoint] = useState([]);
  const [listinhistory, setListinhistory] = useState([]);
  const [listdoc, setListdoc] = useState([]);
  const [listuser, setLisuser] = useState([]);
  const [isdoc, setIstdoc] = useState(false);

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

  const [loading, setLoading] = useState(true);

  const getUserById = (userId) => {
    // console.log(listdoc.filter((user) => user.uid == userId)[0]);
    if (listdoc.findIndex((user) => user.uid == userId) == -1) {
      let a = 1;
    }
    return listdoc.filter((user) => user.uid == userId)[0];
  };

  useEffect(() => {
    setLoading(true);

    const doctorUid = [];
    setAppointmenter(auth.currentUser.uid);
    const subscriber = app
      .firestore()
      .collection("appointment")
      .where("group", "array-contains", auth.currentUser.uid)
      .onSnapshot((querySnapshot) => {
        // check doctor
        const allAppointment = [];
        querySnapshot.forEach((res) => {
          if (auth.currentUser.uid == res.data().appointmented) {
            setIstdoc(true);
          }
          // console.log("res.data()", res.data());
          const data = res.data();
          data.id = res.id;

          if (!doctorUid.includes(data.appointmented))
            doctorUid.push(data.appointmented);
          allAppointment.push(data);
        });

        // console.log("allAppointment", allAppointment);
        allAppointment.sort((item2, item1) => {
          return item1.date < item2.date;
        });
        // console.log(allAppointment);
        setListAppointment(
          allAppointment.filter(
            (data) =>
              data.date >= datenow &&
              months.findIndex((element) => element == data.month) >=
                new Date().getMonth()
          )
        );
        setListinhistory(
          allAppointment.filter(
            (data) =>
              data.date < datenow &&
              months.findIndex((element) => element == data.month) <=
                new Date().getMonth()
          )
        );
      });

    const subscriber2 = app
      .firestore()
      .collection("user")
      .onSnapshot((querySnapshot) => {
        const listuser = [];
        querySnapshot.forEach((user) => {
          const data = user.data();
          data.uid = user.id;
          listuser.push(data);
        });
        setLisuser(listuser);
        // console.log(listuser);
      });

    const subscriber1 = app
      .firestore()
      .collection("doctor")
      .onSnapshot((querySnapshot) => {
        const listdoctor = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.uid = doc.id;
          listdoctor.push(data);
        });
        setListdoc(listdoctor);
        // console.log(listdoctor);
      });

    if (loading) {
      setLoading(false);
    }

    return () => {
      subscriber();
      subscriber1();
      subscriber2();
    };
  }, []);

  // delete appointment
  function deleteSubject(item) {
    // console.log(item);
    let list = listdoc.filter((element) => {
      // console.log(element.uid == item.appointmented);
      return element.uid == item.appointmented;
    });
    // console.log(list[0].appointmentlist, "---------");
    let deleted = list[0].appointmentlist.findIndex(
      (element) => element == item.time + item.date + item.month + item.year
    );
    // console.log(deleted);
    // console.log("----------------------", deleted);
    if (deleted < 0) {
      alert("Not found");
    } else {
      list.splice(deleted, 1);
      subjCollectiondoctor
        .doc(item.appointmented)
        .update({ appointmentlist: list });
      const delSubjDoc = app.firestore().collection("appointment").doc(item.id);
      delSubjDoc.delete();
      alert("Delete Complete");
    }
    // console.log(list);
    // navigation.navigate("Appointment");
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Signin");
      })
      .catch((error) => alert(error.message));
  };

  function getUserInfo(uid) {
    let listbuffer = listuser;
    listbuffer = listbuffer.filter((data) => data.uid == uid);
    return listbuffer;
    // console.log(listbuffer);
  }

  const FirstRoute = () => (
    <View style={styles.container}>
      <ScrollView>
        {listAppointment.map((element, index) => {
          // console.log("element", element);
          let user = getUserInfo(element.appointmenter);
          const doc = getUserById(element.appointmented);
          // if (user[0] != undefined) {
          //   console.log(user[0]);
          // }
          // console.log(user[0]);
          // console.log("element doc data", doc);

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
              {isdoc ? (
                <>
                  <View style={styles.appointmentdetail}>
                    <Text>Patient</Text>
                    <Text>
                      {user[0] != undefined ? user[0].fullname : "loading"}
                    </Text>
                  </View>
                  <View style={styles.appointmentdetail}>
                    <Text>Type</Text>
                    <Text>{doc.type}</Text>
                  </View>
                  <View style={styles.appointmentdetail}>
                    <Text>Place</Text>
                    <Text>{doc.workplace}</Text>
                  </View>

                  <View style={styles.appointmentdetail}>
                    <Text>Status</Text>
                    <Text style={{ color: "blue" }}>Wait for treat</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.appointmentdetail}>
                    <Text>Doctor</Text>
                    <Text>{doc != undefined ? doc.fullname : "loading"}</Text>
                  </View>
                  <View style={styles.appointmentdetail}>
                    <Text>Type</Text>
                    <Text>{doc != undefined ? doc.type : "loading"}</Text>
                  </View>
                  <View style={styles.appointmentdetail}>
                    <Text>Place</Text>
                    <Text>{doc != undefined ? doc.workplace : "loading"}</Text>
                  </View>
                  {datenow + 1 <= element.date ? (
                    <TouchableOpacity
                      style={[styles.appointmentdetail]}
                      onPress={() => {
                        deleteSubject(element);
                      }}
                    >
                      <Text style={styles.cancel}>Cancel</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={[styles.appointmentdetail]}>
                      <Text style={styles.noncancel}>Cancel</Text>
                    </View>
                  )}
                </>
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
          let user = getUserInfo(element.appointmenter);
          const doc = getUserById(element.appointmented);
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
              {isdoc ? (
                <>
                  <View style={styles.appointmentdetail}>
                    <Text>Patient</Text>
                    <Text>
                      {user[0] != undefined ? user[0].fullname : "loading"}
                    </Text>
                  </View>
                  <View style={styles.appointmentdetail}>
                    <Text>Type</Text>
                    <Text>{doc.type}</Text>
                  </View>
                  <View style={styles.appointmentdetail}>
                    <Text>Place</Text>
                    <Text>{doc.workplace}</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.appointmentdetail}>
                    <Text>Doctor</Text>
                    <Text>{doc != undefined ? doc.fullname : "loading"}</Text>
                  </View>
                  <View style={styles.appointmentdetail}>
                    <Text>Type</Text>
                    <Text>{doc != undefined ? doc.type : "loading"}</Text>
                  </View>
                  <View style={styles.appointmentdetail}>
                    <Text>Place</Text>
                    <Text>{doc != undefined ? doc.workplace : "loading"}</Text>
                  </View>
                </>
              )}
              <View style={styles.appointmentdetail}>
                <Text>Status</Text>
                <Text style={{ color: "green" }}>treated</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      {/* <TouchableOpacity onPress={handleSignOut} style={styles.logout}>
        <Text style={{ color: "red" }}>Logout</Text>
      </TouchableOpacity> */}
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
  // if (loading) {
  //   return <Loading />;
  // }

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
    width: "32%",
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
