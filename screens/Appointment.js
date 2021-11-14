import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from "@expo/vector-icons";

export default function Appointment({ navigation }) {
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

  let dateBubble = [];
  const [month, setMonth] = useState(10); // 0-11
  const [year, setYear] = useState(2021);
  let numOfDays = new Date(year, month, 0).getDate();
  const datenow = new Date().getDate();
  const [selectdate, setSelectdate] = useState(datenow);

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

  const [selecttime, setSelecttime] = useState("10.00 a.m.");

  for (let i = datenow; i <= numOfDays; i++) {
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
      <TouchableOpacity
        style={[styles.button, , { marginLeft: 20 }]}
        activeOpacity={0.8}
      >
        <SelectDropdown
          data={months}
          defaultValue={months[month]}
          onSelect={(selectedItem, index) => {
            setMonth(index);
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

      <View style={styles.rect}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {dateBubble}
        </ScrollView>
      </View>

      <Text style={styles.morningSlots}>Morning Slots</Text>
      <View style={styles.buttons} activeOpacity={0.8}>
        {morningTime.map((mtime, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                selecttime == mtime
                  ? styles.selecteddate
                  : styles.notselectdate,
              ]}
              key={index}
              onPress={() => {
                setSelecttime(mtime);
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  selecttime == mtime && { color: "#fff" },
                ]}
              >
                {mtime}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.afternoonSlots}>Afternoon Slots</Text>
      <View style={styles.buttons} activeOpacity={0.8}>
        {afternoonTime.map((atime, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                selecttime == atime
                  ? styles.selecteddate
                  : styles.notselectdate,
              ]}
              key={index}
              onPress={() => {
                setSelecttime(atime);
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  selecttime == atime && { color: "#fff" },
                ]}
              >
                {atime}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        activeOpacity={0.8}
        onPress={() => {
          alert("Successfully");
          navigation.navigate("Appointment");
        }}
      >
        <View style={styles.buttonContainer2}>
          <Text style={styles.buttonText2}>Confirm</Text>
        </View>
      </TouchableOpacity>
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
    width: "25%",
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
});
