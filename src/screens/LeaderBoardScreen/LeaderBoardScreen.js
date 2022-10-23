import React, { useState, useEffect } from "react";
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
} from "react-native";
import { Header } from "./Header";
import { WebView } from "react-native-webview";
import { Table, Row, Rows } from 'react-native-table-component';
import colors from "../../../constants/colors";
import RankTable from "../../components/LeaderBoard/RankTable";

import { CallApi } from "../HomeScreen/api/Api";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export const LeaderBoardScreen = (props) => {
  const isFocused = useIsFocused();
  const [userInfo, setUserInfo] = useState(null);

  useEffect( ()=>{
    if(isFocused){
      (async() => {
        const userDetailsString = await SecureStore.getItemAsync("userDetails");
        if(userDetailsString === null){
          props.navigation.navigate("LoginScreen");
        }else{
          const userDetails = JSON.parse(userDetailsString);
          setUserInfo(userDetails)
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
            }
          }
        },(error) => {
          console.log("=====",error)
          alert("Invalid data.");
        }
    );
  };

  return (
    <Provider>
      <Header navigation={props.navigation} />
      {
        userInfo !== null ?
            <WebView
                style={{margin: 5}}
                originWhitelist={['*']}
                source={{ uri: "http://116.68.200.97:6044/mobile_view/leader_board?user_id="+userInfo.id }}
            />
            : null
      }

    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  HeadStyle: {},
  TableText: {},
});
