import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const EditPlayerView = (props) => {
  const [check, setCheck] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, height: "100%", width: "100%" }}>
        <Image
          resizeMode="contain"
          style={{ width: "100%", height: 40 }}
          source={require("../../../assets/img_circle.png")}
        />
      </View>
      <View style={{ flex: 4 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Sakib Al Hasan
        </Text>
        <Text style={{ color: "white" }}>Batsman</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Ionicons name="trash" style={{fontSize:20,fontWeight:"bold", color:colors.red}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between"
  },
});

export default EditPlayerView;
