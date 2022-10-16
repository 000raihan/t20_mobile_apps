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

import { CallApi } from "./api/Api";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export const ViewDetailsScreen = (props) => {
  const isFocused = useIsFocused();
  const [match, setMatch] = useState(null)

  useEffect( ()=>{
    if(isFocused){
      (async() => {
        const match = await CallApi.getMatch();
        setMatch(match.url)
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

  const runFirst = `
  // var appBanners = document.getElementsByClassName('global-navigation__fixed-container');

  // for (var i = 0; i < appBanners.length; i ++) {
  //     appBanners[i].style.height = 0;
  //     appBanners[i].style.display = 'none';
  // }
  // ;
  // var appBanners2 = document.getElementsByClassName('partners__top-level');
  
  // for (var i = 0; i < appBanners2.length; i ++) {
  //     appBanners2[i].style.display = 'none';
  //     appBanners2[i].style.height = 0;
  // }
  
  // var appBanners3 = document.getElementsByClassName('partners__block');
  // for (var i = 0; i < appBanners3.length; i ++) {
  //     appBanners3[i].style.display = 'none';
  // }
  
  // var appBanners5 = document.getElementsByClassName('global-footer__branding-container');
  //   if(appBanners5){
  //     for (var i = 0; i < appBanners5.length; i ++) {
  //       appBanners5[i].style.display = 'none';
  //   }
  // }
  
  
  // var appBanners6 = document.getElementsByClassName('gam-ad-embed');
  // for (var i = 0; i < appBanners6.length; i ++) {
  //     appBanners6[i].style.display = 'none';
  // }
  // var appBanners7 = document.getElementsByClassName('promo-tournament');
  // for (var i = 0; i < appBanners7.length; i ++) {
  //     appBanners7[i].style.display = 'none';
  // }
  // var appBanners8 = document.getElementsByClassName('video-carousel');
  // for (var i = 0; i < appBanners8.length; i ++) {
  //     appBanners8[i].style.display = 'none';
  // }
  // var appBanners9 = document.getElementsByClassName('article-hero-list');
  // for (var i = 0; i < appBanners9.length; i ++) {
  //     appBanners9[i].style.display = 'none';
  // }
  
  // var appBanners10 = document.getElementsByClassName('global-footer');
  // for (var i = 0; i < appBanners10.length; i ++) {
  //     appBanners10[i].style.display = 'none';
  // }

    `;

  return (
    <Provider>
      <Header navigation={props.navigation} />

      <WebView
             style={{ marginTop: -90 }}
            originWhitelist={['*']}
            source={{ uri: match }}
            // source={{ uri: "https://www.t20worldcup.com/" }}
            // source={{ uri: "http://116.68.200.97:6044/mobile_view/next_match" }}
            injectedJavaScript={runFirst}
        />
    </Provider>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   // flex: 1,
  //   width:"90%",
  //   alignSelf:"center"
  // },
});



// var appBanners = document.getElementsByClassName('global-navigation__fixed-container');

// for (var i = 0; i < appBanners.length; i ++) {
//     appBanners[i].style.height = 0;
//     appBanners[i].style.display = 'none';
// }
// ;
// var appBanners2 = document.getElementsByClassName('partners__top-level');

// for (var i = 0; i < appBanners2.length; i ++) {
//     appBanners2[i].style.display = 'none';
//     appBanners2[i].style.height = 0;
// }

// var appBanners3 = document.getElementsByClassName('partners__block');
// for (var i = 0; i < appBanners3.length; i ++) {
//     appBanners3[i].style.display = 'none';
// }

// var appBanners5 = document.getElementsByClassName('global-footer__branding-container');
//   if(appBanners5){
//     for (var i = 0; i < appBanners5.length; i ++) {
//       appBanners5[i].style.display = 'none';
//   }
// }


// var appBanners6 = document.getElementsByClassName('gam-ad-embed');
// for (var i = 0; i < appBanners6.length; i ++) {
//     appBanners6[i].style.display = 'none';
// }
// var appBanners7 = document.getElementsByClassName('promo-tournament');
// for (var i = 0; i < appBanners7.length; i ++) {
//     appBanners7[i].style.display = 'none';
// }
// var appBanners8 = document.getElementsByClassName('video-carousel');
// for (var i = 0; i < appBanners8.length; i ++) {
//     appBanners8[i].style.display = 'none';
// }
// var appBanners9 = document.getElementsByClassName('article-hero-list');
// for (var i = 0; i < appBanners9.length; i ++) {
//     appBanners9[i].style.display = 'none';
// }

// var appBanners10 = document.getElementsByClassName('global-footer');
// for (var i = 0; i < appBanners10.length; i ++) {
//     appBanners10[i].style.display = 'none';
// }