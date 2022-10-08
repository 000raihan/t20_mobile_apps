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
  useWindowDimensions,
} from "react-native";
import Colors from "../../utils/Colors";
import { Header } from "./components/Header";
import { Table, Row, Rows } from "react-native-table-component";
import { WebView } from "react-native-webview";
import FixtureView from "../../components/Fixtures/FixtureView";
import colors from "../../../constants/colors";

import { CallApi } from "../HomeScreen/api/Api";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export const NextMatchScreen = (props) => {
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
            }
          }
        },(error) => {
          console.log("=====",error)
          alert("Invalid data.");
        }
    );
  }

  return (
    <Provider>
      <Header navigation={props.navigation} />
      <View style={{backgroundColor:colors.primary, justifyContent:"center", alignItems:"center", padding:10}}>
          <Text style={{color:colors.red, fontWeight:"bold",fontSize:16}}>Upcoming Match</Text>

        </View>
      <View style={styles.container}>
          <FixtureView />
          <FixtureView />
          <FixtureView />
          <FixtureView />
          <FixtureView />
          <FixtureView />
          <FixtureView />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width:"90%",
    alignSelf:"center"
  },
});
