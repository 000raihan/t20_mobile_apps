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
  TextInput,
  ImageBackground,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import { Header } from "../HomeScreen/components/Header";
import colors from "../../../constants/colors";

export const CreateTeamScreen = ({ navigation }) => {
  return (
    <Provider>
      <Header navigation={navigation} />
      <View style={{flex:1}}>
        <ImageBackground
          resizeMode="cover"
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            position: "relative",
          }}
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
          <SafeAreaView
            style={{ width: "100%", height: "100%" }}
          ></SafeAreaView>
        </ImageBackground>
        <View style={{flex:2, backgroundColor:colors.primary}}>
            <View style={styles.container}>
            <TextInput style={styles.inputDesign} placeholder="Enter Your Team Name"/>
            <MainButton style={{marginTop:10}}>{"Next   >>"}</MainButton>
            </View>
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "80%",
    alignSelf: "center",
    alignItems:"center",
    justifyContent:"center"
  },
  inputDesign: {
    color: "white",
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginTop: 50,
  },
});
