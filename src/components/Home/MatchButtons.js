import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

import colors from "../../../constants/colors";
import MainButton from "../MainButton";

const MatchButtons = (props) => {
  return (
    <View style={styles.container}>
    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", justifyContent:"space-between"}}>
      <Button style={{backgroundColor:colors.red}}>
        <Text style={{color:"white"}}>Previus Match</Text>
      </Button>
      <Button style={{backgroundColor:colors.red, marginLeft:10}}>
        <Text style={{color:"white"}}>Next Match</Text>
      </Button>
    </View>
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        paddingHorizontal:10,
        paddingVertical:5,
        marginBottom: 10,
      },
  button: {
    backgroundColor: colors.yellow,
    paddingVertical: 5,
    paddingHorizontal: 30,
    marginVertical: 4,
    // borderRadius: 25
  },
  buttonText: {
    color: "black",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});

export default MatchButtons;
