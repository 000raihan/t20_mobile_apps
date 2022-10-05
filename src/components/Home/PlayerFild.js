import React from "react";
import { TextInput, StyleSheet, Text, Image, ImageBackground, Button, Pressable } from "react-native";
import { View } from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../../../constants/colors";
import Player from "./Player";

const PlayerFild = (props) => {
  const {players, onPress} = props;
  console.log(players)
  return (
    <View style={styles.container}>
        <ImageBackground resizeMode="cover" resizeMethod="auto" style={{width:"100%", position:"relative", }} source={require("../../../assets/point_bg.png")}>
            <View style={{width:"100%", height:"100%",top:0, left:0, position:"absolute", backgroundColor:"black", opacity:.5}}>
            </View>
          <View style={{paddingVertical:10}}>
          <View style={{paddingVertical:10,paddingHorizontal:7, flexDirection:"row", justifyContent:"space-between"}}>
              <Player player= {players && players[0]}/>
              <Player  player= {players && players[1]}/>
              <Player  player= {players && players[2]}/>
            </View>
            <View style={{paddingVertical:10,paddingHorizontal:15, flexDirection:"row", justifyContent:"space-around"}}>
              <Player  player= {players && players[3]}/>
              <Player  player= {players && players[4]}/>
            </View>
            <View style={{paddingVertical:10,paddingHorizontal:7, flexDirection:"row", justifyContent:"space-between"}}>
              <Player  player= {players && players[5]}/>
              <Player  player= {players && players[6]}/>
              <Player  player= {players && players[7]}/>
            </View>
            <View style={{paddingVertical:10,paddingHorizontal:15, flexDirection:"row", justifyContent:"space-around"}}>
              <Player  player= {players && players[8]}/>
              <Player  player= {players && players[9]}/>
            </View>
            <View style={{paddingVertical:10,paddingHorizontal:15, flexDirection:"row", justifyContent:"center"}}>
              <Player  player= {players && players[10]}/>
            </View>

            <View style={{alignItems:"center"}}>
            <Pressable onPress={onPress} style={{backgroundColor:colors.yellow, paddingVertical:7, paddingHorizontal:15}}>
              <Text>View Details</Text>
            </Pressable>
            </View>
          </View>
           


        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal:10,
    paddingVertical:5,
    borderBottomWidth: 1,
    marginVertical: 10,
  },

});

export default PlayerFild;
