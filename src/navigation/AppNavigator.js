import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import { Host } from "react-native-portalize";
import {
  DrawerNavigator,
} from "./StoneNavigator";
export const AppNavigator = () => {

  return (
      <NavigationContainer ref={navigationRef}>
        <Host>
          <DrawerNavigator />
        </Host>
      </NavigationContainer>
  );

};
