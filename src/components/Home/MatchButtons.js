import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Pressable } from "react-native";
import { Button } from "react-native-paper";

import colors from "../../../constants/colors";
import MainButton from "../MainButton";

const MatchButtons = (props) => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
    <View style={{display: "flex", flexDirection:"row",width:"100%",overflow:"hidden", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between"}}>
      <Pressable onPress={()=>navigation.navigate("PreviousMatchScreen")} style={{ backgroundColor:colors.red, paddingVertical:10, paddingHorizontal:8}}>
        <Text style={{color:"white", fontSize:10,}}>Previous and Upcoming Match</Text>
      </Pressable>
      {/*<Pressable onPress={()=>navigation.navigate("NextMatchScreen")} style={{backgroundColor:colors.red, marginLeft:5, paddingVertical:10, paddingHorizontal:8}}>*/}
      {/*  <Text style={{color:"white", fontSize:10,}}>Upcoming Match</Text>*/}
      {/*</Pressable>*/}
      <Pressable  onPress={()=>navigation.navigate("MatchHighlightScreen")} style={{width:160, backgroundColor:colors.red, marginLeft:5, paddingVertical:10, paddingHorizontal:8}}>
        <Text style={{color:"white", fontSize:10,textAlign: "center"}}>Match highlight</Text>
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
