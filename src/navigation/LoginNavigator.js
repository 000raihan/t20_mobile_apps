import React from "react";
import { Image, Platform } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { LoginScreen } from "../screens/LoginScreen/LoginScreen";

import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

const icons = {
  ic_home: require(`../../assets/Images/ic_home.png`),
  ic_notification: require(`../../assets/Images/ic_notification.png`),
  ic_log_out: require(`../../assets/Images/ic_log_out.png`),
  ic_profile: require(`../../assets/Images/ic_profile.png`),
  ic_order_history: require(`../../assets/Images/ic_order_history.png`),
  ic_prescription: require(`../../assets/Images/ic_prescription.png`),
};

const LoginStack = createStackNavigator();
export const LoginStackScreen = () => (
  <LoginStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <LoginStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      //animationEnabled: false , nằm trong option
    />
  </LoginStack.Navigator>
);
