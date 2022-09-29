import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';

import colors from '../../../constants/colors';

const FixtureView = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.viewContainer}>
            <View style={{flex:4,}}>
                <Text style={{fontSize:18}}>Sun 16 October</Text>
                <View style={{flexDirection:"row"}}>
                    <Text style={{fontWeight:"bold"}}>10:00</Text>
                    <Text style={{opacity:0.5, fontWeight:"bold", marginLeft:5}}>(Your Time)</Text>
                </View>
                <Text style={{fontWeight:"bold"}}>
                    Kardinia Park, Geelong
                </Text>
                <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:11, fontWeight:"bold"}}>15:00</Text>
                    <Text style={{fontSize:11, fontWeight:"bold", opacity:.6, marginLeft:5}}>Sun 16 October (LOCAL)</Text>
                </View>
            </View>
            <View style={{flex:3,}}>
                <View style={{flex:1,flexDirection:"row", alignItems:'center' }}>
                    <Image style={{width:"30%", height:30}} resizeMode="cover" source={require("../../../assets/bd-flag.png")}/>
                    <Text style={{fontSize:15,fontWeight:"bold", marginLeft:5}}>Bangladesh</Text>
                </View>
                <View style={{flex:1,flexDirection:"row", }}>
                    <Image style={{width:"30%", height:30}} resizeMode="cover" source={require("../../../assets/sr-flag.jpg")}/>
                    <Text style={{fontSize:15,fontWeight:"bold", marginLeft:5}}>Srilanka</Text>
                </View>
            </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewContainer:{
    marginTop:8,
    flexDirection:"row",
    borderWidth:.5,
    borderColor:"black",
    padding:5
  }
});

export default FixtureView;
