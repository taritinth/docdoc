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

export default function TabViewExample() {
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

  const getCollection = (querySnapshot) => {
    let all_data = [];
    let doctorUid = [];
    querySnapshot.forEach((res) => {
      const { time, month, year, date, appointmented, appointmenter, group } =
        res.data();
      doctorUid.push(res.data().appointmented);
      setAppointmenter(appointmenter);
      // getUserById(appointmented);
      // console.log(res.data());
      all_data.push({
        key: res.id,
        appointmenter,
        appointmented,
        month,
        year,
        date,
        time,
        group,
      });
    });
    // sort by ????
    // console.log(all_data.appointmented);

    // subjCollectiondoctor = app.firestore().collection("doctor");

    // doctorUid.forEach((userId) => {
    //   subjCollectiondoctor = subjCollectiondoctor.where(
    //     "members",
    //     "==",
    //     userId
    //   );
    // });

    all_data.sort((item2, item1) => {
      return (
        item1.date < item2.date
        // &&
        // months.findIndex((element) => element == item1.month) <=
        //   months.findIndex((element) => element == item2.month)
      );
      // console.log(item2);
    });
    // console.log(all_data);
    setListinfoappoint(
      all_data.filter(
        (data) =>
          data.appointmenter == appointmenter &&
          // data.appointmented == appointmented &&
          data.date >= datenow &&
          months.findIndex((element) => element == data.month) >=
            new Date().getMonth()
      )
    );

    setListinhistory(
      all_data.filter(
        (data) =>
          data.appointmenter == appointmenter &&
          // data.appointmented == appointmented &&
          data.date < datenow &&
          months.findIndex((element) => element == data.month) <=
            new Date().getMonth()
      )
    );
    // console.log(listinfoappoint);
  };

  const getUserById = (userId) => {
    console.log(listdoc.filter((user) => user.uid == userId)[0]);
    return listdoc.filter((user) => user.uid == userId)[0];
  };

  useEffect(() => {
    setLoading(true);

    const doctorUid = [];
    const subscriber = app
      .firestore()
      .collection("appointment")
      .where("group", "array-contains", auth.currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const allAppointment = [];
        querySnapshot.forEach((res) => {
          // console.log("res.data()", res.data());
          const data = res.data();
          data.id = res.id;

          if (!doctorUid.includes(data.appointmented))
            doctorUid.push(data.appointmented);
          allAppointment.push(data);
        });

        // console.log("allAppointment", allAppointment);

        setListAppointment(allAppointment);
        setListinhistory(allAppointment);

        // sort by ????
        // console.log(all_data.appointmented);

        // subjCollectiondoctor = app.firestore().collection("doctor");

        // doctorUid.forEach((userId) => {
        //   subjCollectiondoctor = subjCollectiondoctor.where(
        //     "members",
        //     "==",
        //     userId
        //   );
        // });

        // all_data.sort((item2, item1) => {
        //   return (
        //     item1.date < item2.date
        //     // &&
        //     // months.findIndex((element) => element == item1.month) <=
        //     //   months.findIndex((element) => element == item2.month)
        //   );
        //   // console.log(item2);
        // });
        // // console.log(all_data);
        // setListinfoappoint(
        //   all_data.filter(
        //     (data) =>
        //       data.appointmenter == appointmenter &&
        //       // data.appointmented == appointmented &&
        //       data.date >= datenow &&
        //       months.findIndex((element) => element == data.month) >=
        //         new Date().getMonth()
        //   )
        // );

        // setListinhistory(
        //   all_data.filter(
        //     (data) =>
        //       data.appointmenter == appointmenter &&
        //       // data.appointmented == appointmented &&
        //       data.date < datenow &&
        //       months.findIndex((element) => element == data.month) <=
        //         new Date().getMonth()
        //   )
        // );
        // console.log(listinfoappoint);
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
        console.log(listdoctor);
      });

    // console.log("doctorUid", doctorUid);

    // let listdoctor = [];
    // doctorUid.forEach(async (uid) => {
    //   await app
    //     .firestore()
    //     .collection("doctor")
    //     .doc(uid)
    //     .get()
    //     .then((doc) => {
    //       // console.log("doc data", doc.data());

    //       const data = doc.data();
    //       data.uid = doc.id;
    //       listdoctor.push(data);
    //     });

    //   console.log("listdoctor", listdoctor);
    //   setListdoc(listdoctor);
    // });

    if (loading) {
      setLoading(false);
    }

    return () => {
      subscriber();
      subscriber1();
    };
  }, []);

  // delete appointment
  function deleteSubject(item) {
    let list = listdoc.appointmentlist;
    let deleted = list.findIndex(
      (element) => element == item.time + item.date + item.month + item.year
    );
    // console.log(list);
    // console.log("----------------------", deleted);
    if (deleted < 0) {
      alert("Not found");
    } else {
      list.splice(deleted, 1);
      subjCollectiondoctor.update({ appointmentlist: list });
      const delSubjDoc = app
        .firestore()
        .collection("appointment")
        .doc(item.key);
      delSubjDoc.delete();
      alert("Delete Complete");
    }
    // console.log(list);
    // navigation.navigate("Appointment");
  }

  const FirstRoute = () => (
    <View style={styles.container}>
      <ScrollView>
        {listAppointment.map((element, index) => {
          // console.log("element", element);

          const doc = getUserById(element.appointmented);
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
              <View style={styles.appointmentdetail}>
                <Text>Doctor</Text>
                <Text>{doc.fullname}</Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Type</Text>
                <Text>{doc.type}</Text>
              </View>
              <View style={styles.appointmentdetail}>
                <Text>Place</Text>
                <Text>{doc.workplace}</Text>
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
                <Text>{listdoc.fullname}</Text>
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
  if (loading) {
    return <Loading />;
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
    // <View style={styles.container}>
    //   <FlatList
    //     data={listAppointment}
    //     keyExtractor={(item) => item.key}
    //     renderItem={({ item }) => (
    //       <View style={styles.appointment}>
    //         <View style={styles.appointmentdetail}>
    //           <Text>Date</Text>
    //           <Text>
    //             {item.date} {item.month} {item.year}
    //           </Text>
    //         </View>
    //         <View style={styles.appointmentdetail}>
    //           <Text>Time</Text>
    //           <Text>{item.time}</Text>
    //         </View>
    //         <View style={styles.appointmentdetail}>
    //           <Text>Doctor</Text>
    //           <Text>doc.fullname</Text>
    //         </View>
    //         <View style={styles.appointmentdetail}>
    //           <Text>Type</Text>
    //           <Text>doc.type</Text>
    //         </View>
    //         <View style={styles.appointmentdetail}>
    //           <Text>Place</Text>
    //           <Text>doc.workplace</Text>
    //         </View>
    //         {datenow + 1 <= item.date ? (
    //           <TouchableOpacity
    //             style={[styles.appointmentdetail]}
    //             onPress={() => {
    //               deleteSubject(item);
    //             }}
    //           >
    //             <Text style={styles.cancel}>Cancel</Text>
    //           </TouchableOpacity>
    //         ) : (
    //           <View style={[styles.appointmentdetail]}>
    //             <Text style={styles.noncancel}>Cancel</Text>
    //           </View>
    //         )}
    //       </View>
    //     )}
    //   />
    //   {/* <ScrollView>
    //     {listAppointment.map((element, index) => {
    //       console.log("element", element);

    //       let doc = getUserById(element.appointmented);
    //       // console.log(doc);
    //       return (
    //         <View style={styles.appointment} key={index}>
    //           <View style={styles.appointmentdetail}>
    //             <Text>Date</Text>
    //             <Text>
    //               {element.date} {element.month} {element.year}
    //             </Text>
    //           </View>
    //           <View style={styles.appointmentdetail}>
    //             <Text>Time</Text>
    //             <Text>{element.time}</Text>
    //           </View>
    //           <View style={styles.appointmentdetail}>
    //             <Text>Doctor</Text>
    //             <Text>{doc.fullname}</Text>
    //           </View>
    //           <View style={styles.appointmentdetail}>
    //             <Text>Type</Text>
    //             <Text>{doc.type}</Text>
    //           </View>
    //           <View style={styles.appointmentdetail}>
    //             <Text>Place</Text>
    //             <Text>{doc.workplace}</Text>
    //           </View>
    //           {datenow + 1 <= element.date ? (
    //             <TouchableOpacity
    //               style={[styles.appointmentdetail]}
    //               onPress={() => {
    //                 deleteSubject(element);
    //               }}
    //             >
    //               <Text style={styles.cancel}>Cancel</Text>
    //             </TouchableOpacity>
    //           ) : (
    //             <View style={[styles.appointmentdetail]}>
    //               <Text style={styles.noncancel}>Cancel</Text>
    //             </View>
    //           )}
    //         </View>
    //       );
    //     })}
    //   </ScrollView> */}
    // </View>
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
