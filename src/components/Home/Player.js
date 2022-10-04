import React from "react";
import { TextInput, StyleSheet, Text, Image, ImageBackground } from "react-native";
import { View } from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../../../constants/colors";

const Player= (props) => {
    const {player} = props
  return (
    <View style={{width:"30%", alignItems:"center"}}>
      <View style={{width:"50%", height:65, backgroundColor:"white", borderRadius:5}}>
      </View>
      <Text style={{fontSize:12, color:"white", textAlign:"center", marginTop:5}}>{player && player.player_name}</Text>
        <Text style={{fontSize:11, color:"white", textAlign:"center"}}>{player && player.role}</Text>
        <Text style={{fontSize:10, color:colors.red, textAlign:"center"}}>{player && player.point || 0}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
 

});

export default Player;
