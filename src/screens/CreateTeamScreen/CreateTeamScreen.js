import React, { useEffect, useState } from "react";
import { Portal, Provider } from "react-native-paper";

import {
    View,
    StyleSheet,
    TextInput,
    ImageBackground,
    SafeAreaView,
   Alert,
} from "react-native";
import MainButton from "../../components/MainButton";
import colors from "../../../constants/colors";
import { Storage } from 'expo-storage';

export const CreateTeamScreen = (props) => {
  const [teamName, setTeamName] =useState("");

  const onPress = async ()=> {
      await Storage.setItem({
          key: "select_player_list",
          value: JSON.stringify([])
      });

      if(teamName === ""){
          Alert.alert('Validation', 'Please enter your team name', [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
      }else{
          await Storage.setItem({
              key: "select_player",
              value: JSON.stringify({team_name: teamName})
          });

          props.navigation.navigate("AllTeamsScreen");
      }
  }

  return (
    <Provider>
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
            <TextInput onChangeText={setTeamName} value={teamName} style={styles.inputDesign} placeholder="Enter Your Team Name"/>
            <MainButton onPress={onPress} style={{marginTop:10}}>{"Next   >>"}</MainButton>
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
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginTop: 50,
  },
});
