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
} from "react-native";
import Colors from "../../utils/Colors";
import { Header } from "./components/Header";
import { Table, Row, Rows } from "react-native-table-component";
import { WebView } from 'react-native-webview';
import FixtureView from "../../components/Fixtures/FixtureView";
import colors from "../../../constants/colors";

import { CallApi } from "../HomeScreen/api/Api";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export const FixturesScreen = (props) => {
  const [url, setUrl] = useState("")
  const isFocused = useIsFocused();
  const [key, setKey] = useState(1);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        await getFixtures()
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


  const getFixtures = async () => {
    CallApi.fatchFixtures().then(async (result)  => {
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



  // (function() {
  //   document.getElementByClassName(".global-navigation").style.display = none;;
  // })();

  const runFirst = `
   
    var appBanners = document.getElementsByClassName('global-navigation__fixed-container');
    for (var i = 0; i < appBanners.length; i ++) {
        appBanners[i].style.display = 'none';
    };
    var appBanners2 = document.getElementsByClassName('partners__top-level');
    for (var i = 0; i < appBanners2.length; i ++) {
        appBanners2[i].style.display = 'none';
    };
    var appBanners3 = document.getElementsByClassName('partners__block');
    for (var i = 0; i < appBanners3.length; i ++) {
        appBanners3[i].style.display = 'none';
    }
    var appBanners4 = document.getElementsByClassName('btn--tickets');
    if(appBanners4){
      for (var i = 0; i < appBanners6.length; i ++) {
        appBanners4[i].style.display = 'none';
      }
    }
    var appBanners5 = document.getElementsByClassName('global-footer__branding-container');
    if(appBanners5){
      for (var i = 0; i < appBanners5.length; i ++) {
        appBanners5[i].style.display = 'none';
     }
    }
    var appBanners6 = document.getElementsByClassName('match-centre-page__section--right');
    if(appBanners6){
      for (var i = 0; i < appBanners4.length; i ++) {
        appBanners6[i].style.display = 'none';
      }
    }
    var appBanners7 = document.getElementsByClassName('mc-tab');
    if(appBanners7){
      for (var i = 0; i < appBanners7.length; i ++) {
        appBanners7[i].style.display = 'none';
      }
    }
    var appBanners8 = document.getElementsByClassName('mc-team-comparison');
    if(appBanners8){
      for (var i = 0; i < appBanners8.length; i ++) {
        appBanners8[i].style.display = 'none';
      }
    }
    var appBanners9 = document.getElementsByClassName('mc-scorebox__divider-header');
      if(appBanners9){
        for (var i = 0; i < appBanners9.length; i ++) {
          appBanners9[i].style.display = 'none';
      }
    }
    var appBanners10 = document.getElementsByClassName('global-footer');
    for (var i = 0; i < appBanners10.length; i ++) {
        appBanners10[i].style.display = 'none';
    }
    var appBanners11 = document.getElementsByClassName('match-block__video');
    for (var i = 0; i < appBanners11.length; i ++) {
      appBanners11[i].style.display = 'none';
    }
    var appBanners12 = document.getElementsByClassName('match-block__btn-wrapper');
    for (var i = 0; i < appBanners12.length; i ++) {
      appBanners12[i].style.display = 'none';
    }
    var appBanners13 = document.getElementsByClassName('match-block__body');
    for (var i = 0; i < appBanners13.length; i ++) {
      appBanners13[i].style.display = 'none';
    }
    
  `;


  return (
    <Provider>
      <Header navigation={props.navigation} page={true} setKey={setKey} />
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
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "90%",
    alignSelf: "center"
  },
});
