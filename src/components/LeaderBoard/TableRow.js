import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../../constants/colors";

const TableRow = (props) => {
  return (
    <View
      style={{
        width: "100%",
        // marginTop: 5,
        borderWidth: .5,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1, borderRightWidth: 1 }}>
        <Text style={{ textAlign: "center" }}>1</Text>
      </View>
      <View style={{ flex: 3, borderRightWidth: 1 }}>
        <Text style={{ textAlign: "center" }}>Shakib</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: "center" }}>255</Text>
      </View>
    </View>
  );
};

export default TableRow;
