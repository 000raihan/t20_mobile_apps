import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Pressable } from "react-native";
import { Button } from "react-native-paper";

import colors from "../../../constants/colors";
import MainButton from "../MainButton";

const MatchButtons = (props) => {
  return (
    <View style={styles.container}>
    <View style={{flexDirection:"row",width:"100%",overflow:"hidden", flexWrap:"wrap", alignItems:"center", justifyContent:"center", justifyContent:"space-between"}}>
      <Pressable style={{backgroundColor:colors.red, paddingVertical:10, paddingHorizontal:10}}>
        <Text style={{color:"white", fontSize:12,}}>Previous Match</Text>
      </Pressable>
      <Pressable style={{backgroundColor:colors.red, marginLeft:5, paddingVertical:10, paddingHorizontal:10}}>
        <Text style={{color:"white", fontSize:12,}}>Upcoming Match</Text>
      </Pressable>
      <Pressable style={{backgroundColor:colors.red, marginLeft:5, paddingVertical:10, paddingHorizontal:10}}>
        <Text style={{color:"white", fontSize:12,}}>Match highlight</Text>
      </Pressable>
    </View>
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        // paddingHorizontal:10,
        paddingVertical:5,
        marginBottom: 10,
        flexWrap:"wrap"
      },
  buttonText: {
    // color: "black",
    fontFamily: "open-sans",
    fontSize: 10,
  },
});

export default MatchButtons;
