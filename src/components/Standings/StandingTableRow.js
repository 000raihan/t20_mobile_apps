import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../../../constants/colors";

const StandingTableRow = (props) => {
  return (

    <View style={{ width: "100%", borderBottomWidth: .5, borderBottomColor: colors.gray, paddingVertical: 10, paddingHorizontal: 3, flexDirection: "row", justifyContent: "space-between", }}>
      <View style={{ flex: 1, }}><Text style={{ textAlign: "center", fontWeight: "bold", color: colors.red, opacity: .5, }}>1</Text></View>
      <View style={{ flex: 3, flexDirection: "row" }}>
        {/* <Image style={{ width: "30%", height: 20 }} source={require("../../../assets/bd-flag.png")} /> */}
        <Text style={{ marginLeft: 5, textAlign: "center", fontWeight: "bold", opacity: .5 }}>BAN</Text></View>
      <View style={{ flex: 1, }}><Text style={{ textAlign: "center", fontWeight: "bold", opacity: .5 }}>0</Text></View>
      <View style={{ flex: 3 }}><Text style={{ textAlign: "center", fontWeight: "bold", opacity: .5 }}>+0.000</Text></View>
      <View style={{ flex: 1 }}><Text style={{ textAlign: "center", fontWeight: "bold", opacity: .5 }}>0</Text></View>
    </View>

  );
};

export default StandingTableRow;
