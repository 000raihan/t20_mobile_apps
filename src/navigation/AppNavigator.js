import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import { Host } from "react-native-portalize";
import * as SecureStore from "expo-secure-store";
import {
  DrawerNavigator,
  LoginStackScreen
} from "./StoneNavigator";
export const AppNavigator = () => {

  const [user, setUser] = useState(false);

  useEffect( ()=>{
    (async() => {
      const userDetailsString = await SecureStore.getItemAsync("userDetails");
      if(userDetailsString === null){
        // props.navigation.navigate("LoginScreen");
        setUser(false)
      }else{
        // const userDetails = JSON.parse(userDetailsString);
        // await checkPlayerList(userDetails.id);
        setUser(true)
      }
    }) ();
  },[]);

  return (
      <NavigationContainer ref={navigationRef}>
        <Host>
          {user? <DrawerNavigator /> : <LoginStackScreen/>}

        </Host>
      </NavigationContainer>
  );

};
