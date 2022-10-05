import React, { useEffect, useState } from "react";
import { Portal, Provider } from "react-native-paper";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  FlatList,
  ScrollView,
  useWindowDimensions,
  Button,
  Image,
  ImageBackground,
  Pressable, Alert,
} from "react-native";
import colors from "../../../constants/colors";
import { Header } from "./components/Header";
import { Table, Row, Rows } from "react-native-table-component";
import { WebView } from "react-native-webview";
import MainButton from "../../components/MainButton";
import LiveSection from "../../components/Home/LiveSection";
import MatchButtons from "../../components/Home/MatchButtons";
import { useDispatch, useSelector } from "react-redux";

import {CallApi} from "./api/Api";
import {Storage} from "expo-storage";

import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";


export const HomeScreen = (props) => {
  const [totalPoint, setTotalPoing] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const isFocused = useIsFocused();


  useEffect( ()=>{
    if(isFocused){
      (async() => {
        const userDetailsString = await SecureStore.getItemAsync("userDetails");
        if(userDetailsString === null){
          props.navigation.navigate("LoginScreen");
        }else{
          const userDetails = JSON.parse(userDetailsString);
          await checkPlayerList(userDetails.id);
        }
      }) ();
    }

  },[props, isFocused]);

  const checkPlayerList = async (user_id) => {
    CallApi.player_list(user_id).then(async (result)  => {
      // console.log(result.result, "===========")
          if(result.success){
            if(result.result.length === 0){
              props.navigation.navigate("CreateTeamScreen");

            }else{
              await Storage.setItem({
                key: "select_player",
                value: JSON.stringify({team_name: result.result[0].team_name})
              });
              setTotalPoing(result.total_point);
              setTeamName(result.result[0].team_name)
            }
          }else{
            Alert.alert('Error', result.message, [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            // console.log("error", result.error);
          }
        },(error) => {
          console.log("=====",error)
          alert("Invalid data.");
        }
    );
  }

  const onPress = ()=>{
    props.navigation.navigate("MyTeamScreen", {isEdit: true})
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Header navigation={props.navigation} />
        <View style={{backgroundColor:"black"}}>
          <ImageBackground
            source={require("../../../assets/point_bg.png")}
            style={styles.pointBg}
          >
            <View style={styles.pointTextSec}>
              <Text style={styles.pointName}>{teamName && teamName}</Text>
              <Text
                style={{
                  color: "red",
                  fontSize: 80,
                  fontWeight: "bold",
                  margin: -10,
                }}
              >
               {totalPoint && totalPoint[0].point || 0}
              </Text>
              <Text style={{ color: "white", fontSize: 20 }}>Team Points</Text>
              <MainButton onPress={onPress}>View details</MainButton>
            </View>
          </ImageBackground>
        </View>
        <LiveSection />
        <MatchButtons />

        <View style={{ width: "90%", alignSelf: "center" }}>
          <Image
            style={{ width: "100%", height:100, resizeMode: "cover" }}
            source={require("../../../assets/brand_gif.gif")}
          />
        </View>

        <View style={styles.highlightMatch}>
          <ImageBackground
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              opacity:0.8
            }}
            source={require("../../../assets/point_bg.png")}
          >
            <Pressable  style={{backgroundColor:colors.yellow, colors:"white"}}>
                <Text style={{padding:10, color:"white"}}>MATCH HIGHLIGHT</Text>
            </Pressable>
          </ImageBackground>
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  pointBg: {
    width: "100%",
    height: 180,
    opacity:0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  pointTextSec: {
    width: "80%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  pointName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  highlightMatch: {
    marginTop:10,
    alignSelf: "center",
    backgroundColor: "black",
    width: "90%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
