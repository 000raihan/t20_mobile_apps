import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const AddNewPlayer = (props) => {
  const [check, setCheck] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, height: "100%", width: "100%" }}>
        <Image
          resizeMode="contain"
          style={{ width: "100%", height: 40 }}
          source={require("../../../assets/add_player.png")}
        />
      </View>
      <View style={{ flex: 4 }}>
        <Text style={{ color: colors.yellow, fontSize: 18, fontWeight: "bold" }}>
          Add Player
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Ionicons name="add-circle" style={{fontSize:25,fontWeight:"bold", color:colors.yellow}}/>
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

export default AddNewPlayer;
