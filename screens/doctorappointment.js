import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { app, auth } from "../database/firebaseDB";
import { useSelector, useDispatch } from "react-redux";
import ToggleSwitch from "toggle-switch-react-native";

export default function doctorAppointment({ navigation, route }) {
  const [days, setDays] = useState([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);

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

  // fdsUMdSk22QtffilTDnS, qknN4caIqdpf1izJVwHO
  const monthnow = new Date().getMonth();
  const yearnow = new Date().getFullYear();
  // console.log(yearnow);
  const [month, setMonth] = useState(monthnow); // 0-11
  const [year, setYear] = useState(yearnow);
  const datenow = new Date().getDate();
  const [selectdate, setSelectdate] = useState(datenow + 1);
  const [selecttime, setSelecttime] = useState();
  const [doctorinfo, setDoctorinfo] = useState();
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state.local.user);
  // console.log(route.params);

  const docInfojCollection = app
    .firestore()
    .collection("doctor")
    .doc(auth.currentUser.uid);

  useEffect(() => {
    docInfojCollection.get().then((res) => {
      const a = res.data();
      // return a;
      setQueueallday(a.busy);
      setDoctorinfo(a);
      // console.log("AAAAAA");
    });
  }, []);

  let dateBubble = [];
  let numOfDays = new Date(year, month, 0).getDate();

  const [morningTime, setMorningTime] = useState([
    "10.00 a.m.",
    "10.30 a.m.",
    "11.00 a.m.",
    "11.30 a.m.",
    "12.00 a.m.",
  ]);

  const [afternoonTime, setAfternoonTime] = useState([
    "01.00 p.m.",
    "01.30 p.m.",
    "02.00 p.m.",
    "02.30 p.m.",
    "03.00 p.m.",
  ]);

  const [usemonths, setUsemonths] = useState(months.splice(month, 12 - month));
  const [queueallday, setQueueallday] = useState();
  function addQueueDoctor(queue) {
    // alert(queue);
    let list = [queue];
    doctorinfo.appointmentlist.forEach((item) => list.push(item));
    // console.log(list);
    docInfojCollection.update({ appointmentlist: list });
  }

  // 01.00 p.m.19Sep2021
  function checktime(time, index) {
    let issametime = false;
    doctorinfo.appointmentlist.forEach((item) => {
      // console.log(time + selectdate + months[month] + year + "----" + item);
      if (item == time + selectdate + usemonths[month] + year && count != 0) {
        issametime = true;
      }
      if (item == time + selectdate + usemonths[0] + year && count == 0) {
        issametime = true;
      }
    });
    if (issametime) {
      return (
        <View
          style={[styles.buttonContainer, { backgroundColor: "red" }]}
          key={index}
        >
          <Text
            style={[styles.buttonText, selecttime == time && { color: "#fff" }]}
          >
            {time}
          </Text>
        </View>
      );
    } else if (!issametime) {
      // console.log(time, index);
      return (
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            selecttime == time ? styles.selecteddate : styles.notselectdate,
          ]}
          key={index}
          onPress={() => {
            setSelecttime(time);
          }}
        >
          <Text
            style={[styles.buttonText, selecttime == time && { color: "#fff" }]}
          >
            {time}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  // console.log(count);
  let datenow2 = datenow + 1;
  if (usemonths[0] != usemonths[month] && count != 0) {
    datenow2 = 1;
  }

  for (let i = datenow2; i <= numOfDays; i++) {
    dateBubble.push(
      <TouchableOpacity
        key={i}
        style={[
          styles.buttondate,
          { marginLeft: 25 },

          selectdate == i ? styles.selecteddate : styles.notselectdate,
        ]}
        onPress={() => setSelectdate(i)}
      >
        <Text
          style={[
            styles.buttonText,
            { fontWeight: "bold" },
            selectdate == i && { color: "#fff" },
          ]}
        >
          {days[new Date(year, month, i).getDay()]}
        </Text>
        <Text style={[styles.buttonText, selectdate == i && { color: "#fff" }]}>
          {i}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={({ justifyContent: "space-between" }, { flexDirection: "row" })}
      >
        {queueallday ? (
          <TouchableOpacity
            style={[
              styles.button,
              { marginLeft: 20 },
              { marginRight: 100 },
              { width: "30%" },
            ]}
            activeOpacity={0.8}
          >
            {console.log(usemonths)}
            <SelectDropdown
              data={usemonths}
              defaultValue={usemonths[0]}
              onSelect={(selectedItem, index) => {
                setMonth(index);
                // console.log(month);
                setCount(count + 1);
                if (index == 0) {
                  setSelectdate(datenow + 1);
                } else {
                  setSelectdate(1);
                }

                // setSelectdate();
                // console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={() => {
                return <Entypo name="chevron-down" size={24} color="black" />;
              }}
              buttonStyle={styles.selectmonth}
              buttonTextStyle={styles.textselectmonth}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={[
              styles.button,
              { marginLeft: 20 },
              { marginRight: 100 },
              { width: "30%" },
            ]}
          >
            <View style={styles.selectmonth}></View>
          </View>
        )}

        <ToggleSwitch
          isOn={queueallday}
          onColor="#32B5FF"
          offColor="gray"
          label="เปิด-ปิด"
          labelStyle={{ color: "black", fontWeight: "100" }}
          size="large"
          animationSpeed={200}
          onToggle={(isOn) => {
            setQueueallday(!queueallday);
            docInfojCollection.update({ busy: !isOn });
            // console.log("date to : ", setSelectdate);
            // console.log("changed to : ", isOn);
          }}
        />
      </View>
      {!queueallday && (
        <View style={styles.busy}>
          <FontAwesome
            style={({ zIndex: 3 }, { top: -50 })}
            name="calendar-times-o"
            size={100}
            color="gray"
          />
          <Text style={({ zIndex: 3 }, { top: -20 }, { color: "gray" })}>
            คุณปิดรับการจอง
          </Text>
        </View>
      )}
      <View style={styles.rect}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {dateBubble}
        </ScrollView>
      </View>

      {/* morningtime */}
      <Text style={styles.morningSlots}>Morning Slots</Text>

      {!!doctorinfo ? (
        <View style={styles.buttons} activeOpacity={0.8}>
          {morningTime.map((mtime, index) => checktime(mtime, index))}
        </View>
      ) : (
        <Text>loading</Text>
      )}

      {/* afternoon time */}

      <Text style={styles.afternoonSlots}>Afternoon Slots</Text>

      {!!doctorinfo ? (
        <View style={styles.buttons} activeOpacity={0.8}>
          {afternoonTime.map((atime, index) => checktime(atime, index))}
        </View>
      ) : (
        <Text>loading</Text>
      )}

      {/* checktime(atime, index) */}
      {!!doctorinfo ? (
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.8}
          onPress={() => {
            if (!!selecttime) {
              if (count == 0) {
                addQueueDoctor(selecttime + selectdate + usemonths[0] + year);
              } else {
                addQueueDoctor(
                  selecttime + selectdate + usemonths[month] + year
                );
              }
              // usemonths[month];
              alert("add Successfully");
              navigation.navigate("Appointment");
            } else {
              alert("Please enter time");
            }
          }}
        >
          <View style={styles.buttonContainer2}>
            <Text style={styles.buttonText2}>Confirm</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Text>loading</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  rect: {
    marginTop: 20,
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
  buttonText: {
    color: "black",

    fontSize: 14,
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
    elevation: 3,
    height: 85,
    minWidth: 70,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectmonth: {
    // F8F8F8
    backgroundColor: "#F8F8F8",
    width: "80%",
    height: 50,
  },
  textselectmonth: {
    marginLeft: -10,
  },
  selecteddate: {
    backgroundColor: "#32B5FF",
  },
  notselectdate: {
    backgroundColor: "#fff",
  },

  confirmButton: {
    alignSelf: "stretch",
    marginTop: 40,
    marginHorizontal: 20,
  },
  buttonContainer2: {
    backgroundColor: "#32B5FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText2: {
    color: "white",
    fontSize: 18,
  },
  busy: {
    // position: "absolute",
    backgroundColor: "#F8F8F9",
    opacity: 0.9,
    width: "100%",
    height: "100%",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
