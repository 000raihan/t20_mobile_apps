import React from "react";
import { TextInput, StyleSheet, Text, Image, ImageBackground } from "react-native";
import { View } from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../../../constants/colors";

const Player= (props) => {
    const {player} = props;
    const player_image = player && player.player_image;
    // console.log("Player is :", player.player_image);

    // if(!player.player_image){
    //   return
    // }

    // co

  return (
    
    <View style={{width:"30%", alignItems:"center"}}>
      <View style={{width:"50%", height:65, borderRadius:5}}>
        <Image resizeMode="cover" style={{width:"100%", height:"100%"}} source={{uri: "http://116.68.200.97:6044/images/players/"+  player_image }}/>
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
