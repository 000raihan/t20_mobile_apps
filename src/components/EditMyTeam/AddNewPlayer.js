import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable} from "react-native";
import colors from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const AddNewPlayer = (props) => {
  const [check, setCheck] = useState(false);
  const {onPress, selectedPlayres} = props;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {/* <View style={{ flex: 1, height: "100%", width: "100%" }}>
        <Text style={{fontSize:20}}>{`You selected ${selectedPlayres}`}</Text>
  </View> */}
      <View style={{ flex: 1}}>
        <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
          Add Player
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Ionicons name="add-circle" style={{fontSize:25,fontWeight:"bold", color:colors.yellow}}/>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.yellow,
    marginTop: 10,
    width: "100%",
    flexDirection: "white",
    alignItems: "center",
    justifyContent:"space-between"
  
  },
});

export default AddNewPlayer;
