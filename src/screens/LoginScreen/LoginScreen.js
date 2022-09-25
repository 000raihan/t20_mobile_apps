import React, { useEffect } from "react";
import { Portal, Provider } from "react-native-paper";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  FlatList,
  ScrollView,
  TextInput ,
  ImageBackground,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";

export const LoginScreen = ({ navigation }) => {
  return (
    <Provider>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1, width: "100%", height: "100%", position: "relative" }}
        source={require("../../../assets/image_4.png")}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.4,
          }}
        ></View>
        <SafeAreaView style={{width:"100%", height:"100%"}}>
          <View style={{flex:1, width:"100%",}}>
            <View style={{flex:2, width:"100%", alignItems:"center"}}>
              <Image resizeMode="contain" style={{width:"50%", height:"100%"}} source={require("../../../assets/t20_logo.png")} />
            </View>
            <View
              style={{
                flex: 3,
                width:"80%",
                alignSelf:"center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
                <TextInput style={styles.inputDesign} placeholder="Enter Full Name"/>
                <TextInput style={styles.inputDesign} placeholder="Enter Mobile Number"/>
                <TextInput style={styles.inputDesign} placeholder="Enter Pin Code"/>

                <MainButton style={{marginTop:10}}>Registration</MainButton>

                <Text style={{marginTop:20, color:"white", fontSize:12}}>Don't have account ? </Text>
                <Pressable style={{backgroundColor:"white", paddingVertical:2, paddingHorizontal:10,marginTop:5}}><Text>Go to login</Text></Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  inputDesign:{
    color:"white",
    backgroundColor:"white",
    width:"100%",
    paddingVertical:5,
    paddingHorizontal:8,
    marginTop:10
  }
});
