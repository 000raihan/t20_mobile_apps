import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import { Host } from "react-native-portalize";
import * as SecureStore from "expo-secure-store";
import {
  DrawerNavigator,
  LoginStackScreen,
  CreateTeamStackScreen,
  BottomTabScreen,
  MainNavigatorScreen,
  SplashTwoNavigator
} from "./StoneNavigator";
import { CallApi } from "../screens/HomeScreen/api/Api";
import { Storage } from "expo-storage";
import { Alert } from "react-native";
export const AppNavigator = () => {

  const [user, setUser] = useState(false);
  const [isTeam, setIsTeam] = useState(true);



  const checkPlayerList = async (user_id) => {
    CallApi.player_list(user_id).then(async (result) => {
      if (result.success) {
        if (result.result.length === 0) {
          setIsTeam(false);
        } else {
          setIsTeam(true);
        }
      } else {
        console.log("error", result.error);
      }
    }, (error) => {
      console.log("=====", error)
    }
    );
  }

  useEffect(() => {
    (async () => {
      const userDetailsString = await SecureStore.getItemAsync("userDetails");
      if (userDetailsString === null) {
        // props.navigation.navigate("LoginScreen");
        setUser(false);
      } else {
        // const userDetails = JSON.parse(userDetailsString);
        // await checkPlayerList(userDetails.id);
        setUser(true);
        const userDetails = JSON.parse(userDetailsString);
        // await checkPlayerList(userDetails.id);
      }
    })();
  }, []);




  return (
    <NavigationContainer ref={navigationRef}>
      <Host>
        {
          user ? <SplashTwoNavigator/> : <LoginStackScreen />
        }
      </Host>
    </NavigationContainer>
  );

};
