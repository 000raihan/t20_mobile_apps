import React, { useEffect } from "react";
import { Image, Platform } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomDrawer from "./CustomDrawer";
import Colors from "../utils/Colors";
import CustomText from "../components/UI/CustomText";

import { HomeScreen } from "../screens/HomeScreen";
import { NotificationScreen } from "../screens/NotificationScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { CreateTeamScreen } from "../screens/CreateTeamScreen";
import { AllTeamsScreen } from "../screens/AllTeamsScreen";
import { ViewPlayersScreen } from "../screens/ViewPlayersScreen/ViewPlayersScreen";
import { ViewMyTeamScreen } from "../screens/ViewMyTeamScreen/ViewMyTeamScreen";

import {FixturesScreen} from '../screens/FixturesScreen/FixturesScreen';
import {LeaderBoardScreen} from '../screens/LeaderBoardScreen/LeaderBoardScreen';
import {StandingScreen} from '../screens/StandingScreen/StandingScreen';

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

const HomeStack = createStackNavigator();
export const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <HomeStack.Screen
      name="HomeScreen"
      component={HomeScreen}
    />

      <HomeStack.Screen name="LoginScreen" component={LoginStackScreen} />
      <HomeStack.Screen name="MyTeamScreen" component={ViewMyTeamScreen} />
      
      <HomeStack.Screen name="CreateTeamScreen" component={CreateTeamStackScreen} />
      <HomeStack.Screen name="AllTeamsScreen" component={AllTeamsScreen}/>
      <AllTeamsStack.Screen name="ViewPlayersScreen" component={ViewPlayersScreen} />
  </HomeStack.Navigator>
);

const LoginStack = createStackNavigator();
export const LoginStackScreen = () => (
    <LoginStack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
    >
        <LoginStack.Screen name="LoginScreen" component={LoginScreen}/>
        <LoginStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </LoginStack.Navigator>
);

const CreateTeamStack = createStackNavigator();
export const CreateTeamStackScreen = () => (
    <CreateTeamStack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
    >
        <CreateTeamStack.Screen name="CreateTeamScreen" component={CreateTeamScreen}/>
        <CreateTeamStack.Screen name="AllTeamsScreen" component={AllTeamsStackScreen} />
    </CreateTeamStack.Navigator>
);

const AllTeamsStack = createStackNavigator();
export const AllTeamsStackScreen = () => (
    <AllTeamsStack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
    >
        <AllTeamsStack.Screen name="AllTeamsScreen" component={AllTeamsScreen}/>
        <AllTeamsStack.Screen name="ViewPlayersScreen" component={ViewPlayersScreen} />
    </AllTeamsStack.Navigator>
);


const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
  const drawers = [
        {
          name: "Home",
          screen: HomeStackScreen,
          label: "Home",
          icon: icons.ic_home,
        },
        {
          name: "Notification",
          screen: NotificationScreen,
          label: "Notification",
          icon: icons.ic_notification,
        },
  ];
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerContentOptions={{
        activeTintColor: Colors.grey,
        itemStyle: { marginVertical: 3 },
      }}
    >
      {drawers.map(({ name, icon, label, screen }) => (
        <Drawer.Screen
          key={name}
          name={name}
          component={screen}
          options={() => ({
            title: ({ focused }) => (
              <CustomText
                style={{
                  fontSize: 14,
                  color: focused ? Colors.lighter_green : Colors.white,
                  fontFamily: "Roboto-Medium",
                }}
              >
                {label}
              </CustomText>
            ),
            drawerIcon: ({ focused }) => (
              <Image style={{ width: 23, height: 23 }} source={icon} />
            ),
          })}
        />
      ))}
    </Drawer.Navigator>
  );
};

const Tab = createBottomTabNavigator();
export const BottomTabScreen = () => {
  console.log();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#00B1E5" },
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: "#0093DF",
        // tabBarActiveBackgroundColor:colors.primary,
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { marginTop: -5, marginBottom: 5, fontSize: 12 },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              color={"white"}
              size={20}
              style={{ width: 23, height: 23 }}
              name="home"
            />
          ),
        }}
        name="Home"
        component={HomeStackScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              color={"white"}
              size={20}
              style={{ width: 23, height: 23 }}
              name="calendar"
            />
          ),
        }}
        name="Fixtures"
        component={FixturesScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              color={"white"}
              size={20}
              style={{ width: 23, height: 23 }}
              name="people"
            />
          ),
        }}
        name="Standing "
        component={StandingScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              color={"white"}
              size={20}
              style={{ width: 23, height: 23 }}
              name="podium"
            />
          ),
        }}
        name="LeaderBoard"
        component={LeaderBoardScreen}
      />
    </Tab.Navigator>
  );
};


