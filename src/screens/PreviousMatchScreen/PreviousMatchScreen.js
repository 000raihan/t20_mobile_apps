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
import { WebView } from "react-native-webview";
import FixtureView from "../../components/Fixtures/FixtureView";
import colors from "../../../constants/colors";

import { CallApi } from "../HomeScreen/api/Api";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export const PreviousMatchScreen = (props) => {
  const [url, setUrl] = useState("")
  const isFocused = useIsFocused();

  useEffect( ()=>{
    if(isFocused){
      (async() => {
        await getPreviousMatch();
      }) ();
    }

  },[props, isFocused]);

  const getPreviousMatch = async () => {
    CallApi.fatchPreviousMatch().then(async (result)  => {
          if(result.success){
            setUrl(result.url);
          }
        },(error) => {
          console.log("=====",error)
          alert("Invalid data.");
        }
    );
  }

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

    
    var appBanners6 = document.getElementsByClassName('btn--tickets');
    if(appBanners6){
      for (var i = 0; i < appBanners6.length; i ++) {
        appBanners6[i].style.display = 'none';
      }
    }

    var appBanners5 = document.getElementsByClassName('global-footer__branding-container');
    if(appBanners5){
      for (var i = 0; i < appBanners5.length; i ++) {
        appBanners5[i].style.display = 'none';
     }
    }

    var appBanners4 = document.getElementsByClassName('match-centre-page__section--right');
    if(appBanners4){
      for (var i = 0; i < appBanners4.length; i ++) {
        appBanners4[i].style.display = 'none';
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
    `;

  return (
    <Provider>
      <Header navigation={props.navigation} />
      <WebView
            style={{marginTop: -95}}
            originWhitelist={['*']}
            source={{ uri: url }}
            onMessage={(event) => { }}
            injectedJavaScript={runFirst}
            injectedJavaScriptBeforeContentLoaded={runFirst}
            // source={{ uri: "http://116.68.200.97:6044/mobile_view/previous_match" }}
        />
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
