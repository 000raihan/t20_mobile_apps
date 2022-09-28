import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import { Host } from "react-native-portalize";
import {
  DrawerNavigator,
  HomeStackScreen,
  MainNavigator,
  BottomTabScreen
} from "./StoneNavigator";
import { LoginStackScreen } from "./LoginNavigator";
import { useSelector, useDispatch,  } from "react-redux";
import { addUser } from "../store/features/userSlice";
import {getTeam} from '../store/features/teamSlice';
export const AppNavigator = () => {
  const { user, error, loading } = useSelector((state) => state.user);
  const { team } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   const getData = async () => {
  //       try {
  //         const jsonValue = await AsyncStorage.getItem('user')
  //         return jsonValue != null ? JSON.parse(jsonValue) : null;
  //       } catch(e) {
  //         // error reading value
  //       }
  //     }

  //       getData()
  //       .then(res=>{
  //         console.log(res)
  //         dispatch(addUser(JSON.parse(AsyncStorage.getItem('user'))))
  //       })

  // },[])

  // console.log("user data is : ", user);
  // console.log("team data is ------- : ", team);
  return (
    <NavigationContainer ref={navigationRef}>
      <Host>
        {
        // user && team ? (
        //   <DrawerNavigator />
        // ) :
         user ? (
          <MainNavigator />
        ) : (
          <LoginStackScreen />
        )}
        {/* <BottomTabScreen/> */}
      </Host>
    </NavigationContainer>
  );
};
