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
  BackHandler 
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
import PlayerFild from "../../components/Home/PlayerFild";


export const HomeScreen = (props) => {
  const [totalPoint, setTotalPoing] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const isFocused = useIsFocused();
  const [select_players, setSelectedPlayers] = useState([]);



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

  useEffect(
    () =>
      props.navigation.addListener('beforeRemove', (e) => {
   
          // If we don't have unsaved changes, then we don't need to do anything
          // return;

        BackHandler.exitApp();

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        // Alert.alert(
        //   'Discard changes?',
        //   'You have unsaved changes. Are you sure to discard them and leave the screen?',
        //   [
        //     { text: "Don't leave", style: 'cancel', onPress: () => {} },
        //     {
        //       text: 'Discard',
        //       style: 'destructive',
        //       // If the user confirmed, then we dispatch the action we blocked earlier
        //       // This will continue the action that had triggered the removal of the screen
        //       onPress: () => navigation.dispatch(e.data.action),
        //     },
        //   ]
        // );
      }),
    [props.navigation]
  );

  const checkPlayerList = async (user_id) => {
    CallApi.player_list(user_id).then(async (result)  => {
      // console.log(result.result, "===========")
          if(result.success){
            if(result.result.length === 0){
              props.navigation.navigate("CreateTeamStackScreen");

            }else{
              await Storage.setItem({
                key: "select_player",
                value: JSON.stringify({team_name: result.result[0].team_name})
              });
              setTotalPoing(result.total_point);
              setTeamName(result.result[0].team_name);
              setSelectedPlayers(result.result);
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

  const onPress = async () => {
    await Storage.setItem({
      key: "select_player_list",
      value: JSON.stringify([])
    });
    props.navigation.navigate("MyTeamScreen", {isEdit: true})
  }



  return (
<Provider>
      <View style={styles.container}>
        <Header navigation={props.navigation} />
        {/* <View style={{backgroundColor:colors.primary}}> */}
        <ScrollView>
          <View style={styles.pointBg}>
            <View
              style={{
                width: "100%",
                // height: "80%",
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 4,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 18,
                }}
              >
                <View
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50 / 2,
                    overflow: "hidden",
                    marginRight: 8,
                  }}
                >
                  <Image
                    resizeMode="cover"
                    style={{ height: "100%", width: "100%" }}
                    source={require("../../../assets/team_logo.png")}
                  />
                </View>

                <View>
                  <Text style={{ fontSize: 12, color: colors.red }}>
                    Team Name
                  </Text>
                  <Text style={styles.pointName}>{teamName && teamName}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 3,
                  alignItems: "center",
                  justifyContent: "center",
                  // height: "100%",
                }}
              >
                <Text
                  style={{ color: colors.red, fontSize: 12,  }}
                >
                  Team Points
                </Text>
                <Text
                  style={{
                    color: "red",
                    fontSize: 20,
                    fontWeight: "bold",
                    // margin: -10,
                  }}
                >
                  {(totalPoint && totalPoint[0].point) || 0}
                </Text>
              </View>
              {/* </View> */}
            </View>
          </View>
          <LiveSection />
          <MatchButtons navigation={props.navigation}/>

          <View style={{ width: "90%", alignSelf: "center" }}>
            <Image
              style={{ width: "100%", resizeMode: "contain" }}
              source={require("../../../assets/brand_gif.gif")}
            />
          </View>

          <PlayerFild players={select_players} onPress={onPress} />
        </ScrollView>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  pointBg: {
    width: "100%",
    // height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 10,
  },
  pointTextSec: {},
  pointName: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  highlightMatch: {
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: "black",
    width: "90%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
