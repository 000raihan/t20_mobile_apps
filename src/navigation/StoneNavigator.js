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
import { FixturesScreen } from "../screens/FixturesScreen/FixturesScreen";
import { LeaderBoardScreen } from "../screens/LeaderBoardScreen/LeaderBoardScreen";
import { StandingScreen } from "../screens/StandingScreen/StandingScreen";
import { LoginScreen } from "../screens/LoginScreen/LoginScreen";
import { CreateTeamScreen } from "../screens/CreateTeamScreen/CreateTeamScreen";
import { AllTeamsScreen } from "../screens/AllTeamsScreen/AllTeamsScreen";
import { ViewMyTeamScreen } from "../screens/ViewMyTeamScreen/ViewMyTeamScreen";
import { EditMyTeamScreen } from "../screens/EditMyTeamScreen/EditMyTeamScreen";
import { ViewPlayersScreen } from "../screens/ViewPlayersScreen/ViewPlayersScreen";

import { useSelector, useDispatch } from "react-redux";
import { getTeam } from "../store/features/teamSlice";

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
      //animationEnabled: false , nằm trong option
    />
    <HomeStack.Screen
      name="MyTeamScreen"
      component={ViewMyTeamScreen}
      //animationEnabled: false , nằm trong option
    />
  </HomeStack.Navigator>
);

// ------------------------

const CreateTeamStack = createStackNavigator();
export const TeamStackScreen = () => (
  <CreateTeamStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <CreateTeamStack.Screen
      name="CrateTeam"
      component={CreateTeamScreen}
      //animationEnabled: false , nằm trong option
    />
    <CreateTeamStack.Screen
      name="ViewAllTeam"
      component={AllTeamsScreen}
      //animationEnabled: false , nằm trong option
    />
    <CreateTeamStack.Screen name="ViewPlayers" component={ViewPlayersScreen} />
    <CreateTeamStack.Screen name="HomeScreen" component={BottomTabScreen} />
    
    <CreateTeamStack.Screen name="MyTeamScreen" component={ViewMyTeamScreen} />
    <CreateTeamStack.Screen name="EditMyTeam" component={EditMyTeamScreen} />
  </CreateTeamStack.Navigator>
);

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

const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
  const drawers = [
    {
      name: "BottomTab",
      screen: BottomTabScreen,
    },
    {
      name: "Notification",
      screen: NotificationScreen,
      label: "Notification",
      icon: icons.ic_notification,
    },
    {
      name: "Login",
      screen: LoginScreen,
      label: "Login",
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

const MainStack = createStackNavigator();

export const MainNavigator = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if(user){
      dispatch(getTeam(user.id));
    }

  }, [user]);
  const {myPlayers} = useSelector((state) => state.team);

  // console.log("Team is :::::::::::000 ", myPlayers)

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
    >
      {myPlayers && myPlayers.length > 0 ? (
        <MainStack.Screen
          name="BottomTabScreen"
          component={BottomTabScreen}
          //animationEnabled: false , nằm trong option
        />
      ) : (
        <MainStack.Screen
          name="CreateTeamScreen"
          component={TeamStackScreen}
          //animationEnabled: false , nằm trong option
        />
      )}
    </MainStack.Navigator>
  );
};
