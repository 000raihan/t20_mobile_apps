import React, { useEffect, useState } from 'react';
import { Portal, Provider } from 'react-native-paper';
import { View, StyleSheet, Text, Dimensions, Platform, FlatList, ScrollView, useWindowDimensions } from 'react-native';
import Colors from '../../utils/Colors';
import { Header } from "../NotificationScreen/components/Header";
import { Table, Row, Rows } from 'react-native-table-component';
import { WebView } from 'react-native-webview';
import colors from '../../../constants/colors';
import TableView from '../../components/Standings/TableView';

import { CallApi } from "../HomeScreen/api/Api";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export const StandingScreen = (props) => {
  const [url, setUrl] = useState("")
  const isFocused = useIsFocused();
  const [loaded, setLoaded] = useState(false)
  const [key, setKey] = useState(1);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        await getStandings();
        const userDetailsString = await SecureStore.getItemAsync("userDetails");
        if (userDetailsString === null) {
          props.navigation.navigate("LoginScreen");
        } else {
          const userDetails = JSON.parse(userDetailsString);
          await checkPlayerList(userDetails.id);
        }
      })();
    }

  }, [props, isFocused]);

  const getStandings = async () => {
    CallApi.fatchStandings().then(async (result)  => {
      console.log("=====", result);
          if(result.success){
            setUrl(result.url);
          }
        },(error) => {
          console.log("=====",error)
          alert("Invalid data.");
        }
    );
  }

  const checkPlayerList = async (user_id) => {
    CallApi.player_list(user_id).then(async (result) => {
      // console.log(result.result, "===========")
      if (result.success) {
        if (result.result.length === 0) {
          props.navigation.navigate("CreateTeamScreen");
        }
      }
    }, (error) => {
      console.log("=====", error)
      alert("Invalid data.");
    }
    );
  };

  const runFirst = `
  var appBanners = document.getElementsByClassName('global-navigation__fixed-container');

    for (var i = 0; i < appBanners.length; i ++) {
        appBanners[i].style.height = 0;
        appBanners[i].style.display = 'none';
    }
    ;
  var appBanners2 = document.getElementsByClassName('partners__top-level');

    for (var i = 0; i < appBanners2.length; i ++) {
        appBanners2[i].style.display = 'none';
        appBanners2[i].style.height = 0;
    }

  var appBanners3 = document.getElementsByClassName('partners__block');
    for (var i = 0; i < appBanners3.length; i ++) {
        appBanners3[i].style.display = 'none';
    }

    var appBanners5 = document.getElementsByClassName('global-footer__branding-container');
      if(appBanners5){
        for (var i = 0; i < appBanners5.length; i ++) {
          appBanners5[i].style.display = 'none';
      }
    }


  var appBanners10 = document.getElementsByClassName('global-footer');
    for (var i = 0; i < appBanners10.length; i ++) {
        appBanners10[i].style.display = 'none';
    }
    var appBanners11 = document.getElementsByClassName('promo-tournament');
    for (var i = 0; i < appBanners11.length; i ++) {
        appBanners11[i].style.display = 'none';
    }
    `;


    return (
      <Provider>
        <Header navigation={props.navigation} page={true} setKey={setKey}/>
        <WebView
            style={{ marginTop: -95 }}
            source={{
              uri: url,
            }}
            onMessage={(event) => { }}
            injectedJavaScript={runFirst}
            injectedJavaScriptBeforeContentLoaded={runFirst}
            key={key}
        />

      </Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "90%",
    alignSelf: "center"
  },
});
