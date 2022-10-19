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
  Button,
  Image,
  ImageBackground,
  Pressable, Alert,
  BackHandler,
  Animated
} from "react-native";
import colors from "../../../constants/colors";
import { Header } from "./components/Header";
import { Table, Row, Rows } from "react-native-table-component";
import { WebView } from "react-native-webview";
import MainButton from "../../components/MainButton";
import LiveSection from "../../components/Home/LiveSection";
import MatchButtons from "../../components/Home/MatchButtons";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from 'expo-image-picker';

import { CallApi } from "./api/Api";
import { Storage } from "expo-storage";

import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import PlayerFild from "../../components/Home/PlayerFild";

import * as Notification from "expo-notifications";
import * as Permission from "expo-permissions";

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
    };
  },
});

export const HomeScreen = (props) => {
  const [totalPoint, setTotalPoing] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const isFocused = useIsFocused();
  const [select_players, setSelectedPlayers] = useState([]);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [match_url, setMatch_url] = useState(null)
  // const [animationCall, setAnimationCall] = useState(1)
  const [pickedImagePath, setPickedImagePath] = useState(null);

  // const handleAnimation = () => {
  //   Animated.timing(animation, {
  //     toValue: 1,
  //     duration: 500,
  //     useNativeDriver: true
  //   }).start(() => {
  //     Animated.timing(animation, {
  //       toValue: 0,
  //       duration: 500,
  //       useNativeDriver: true
  //     }).start()
  //   })
  // }
  // const boxInterpolation = animation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [colors.primary, colors.red]
  // });

  // const animatedStyle = {
  //   color: boxInterpolation
  // }

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    // console.log(result);

    if (!result.cancelled) {
      await Storage.setItem({
        key: "user_image",
        value: result.uri
      });
      setPickedImagePath(result.uri);
      // console.log(result.uri);
    }
  };


  useEffect(() => {
    if (isFocused) {
      (async () => {
        const match = await CallApi.getMatch();
        setMatch_url(match.url)
        // console.log("MATCH : ",match)

        const userImage = await Storage.getItem({ key: 'user_image' });
        setPickedImagePath(userImage);

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


  // useEffect(
  //   () =>
  //     props.navigation.addListener('beforeRemove', (e) => {
  //       // If we don't have unsaved changes, then we don't need to do anything
  //       // return;
  //       BackHandler.exitApp();
  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();
  //
  //     }),
  //   [props.navigation]
  // );

  useEffect(() => {
    Permission.getAsync(Permission.NOTIFICATIONS)
      .then((response) => {
        if (response.status !== "granted") {
          return Permission.askAsync(Permission.NOTIFICATIONS);
        }
        return response;
      })
      .then((response) => {
        if (response.status !== "granted") {
          return;
        }
      });
  }, []);

  const checkPlayerList = async (user_id) => {
    CallApi.player_list(user_id).then(async (result) => {
      // console.log(result.result, "===========")
      if (result.success) {
        if (result.result.length === 0) {
          props.navigation.navigate("CreateTeamStackScreen");

        } else {

          const getNotification = await Storage.getItem({ key: 'Notification' });
          if(getNotification === null){
            await Storage.setItem({key: "Notification", value: "1"});
            await Notification.scheduleNotificationAsync({
              content: {
                title: "অভিনন্দন",
                body: `আপনি আপনার সেরা ১১ জন খেলোয়াড় নির্বাচন করেছেন ৷ সেমিফাইনালের আগের দিন পর্যন্ত আপনি সর্বোচ্চ আর ৫ জন খেলোয়াড় আপডেট করতে পারবেন ৷`
              },
              trigger: {
                seconds: 6,
              },
            });
          }

          await Storage.setItem({
            key: "select_player",
            value: JSON.stringify({ team_name: result.result[0].team_name })
          });
          setTotalPoing(result.total_point);
          setTeamName(result.result[0].team_name);
          setSelectedPlayers(result.result);
        }
      } else {
        Alert.alert('Error', result.message, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        // console.log("error", result.error);
      }
    }, (error) => {
      console.log("=====", error)
      alert("Invalid data.");
    }
    );
  }

  // useEffect(() => {

  // }, [])

  // const getMatch = async ()=>{
  //   const match = await CallApi.getMatch();
  //   console.log(match)
  // }



  const onPress = async () => {
    await Storage.setItem({
      key: "select_player_list",
      value: JSON.stringify([])
    });
    // props.navigation.navigate("MyTeamScreen", {isEdit: true})
    props.navigation.navigate("EditTeamScreen", { isEdit: true })
  }



  return (
    <Provider>
      <View style={styles.container}>
        <Header navigation={props.navigation} />
        {/* <View style={{backgroundColor:colors.primary}}> */}
        <ScrollView overScrollMode="never">
          <View style={styles.pointBg}>
            <View
              style={{
                width: "100%",
                // height: "80%",
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 4,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 18,
                }}
              >
                <View
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50 / 2,
                    overflow: "hidden",
                    marginRight: 8,
                  }}
                >
                  <Pressable onPress={() => showImagePicker() }>
                    {
                      pickedImagePath === null ?
                          <Image
                              resizeMode="cover"
                              style={{ height: "100%", width: "100%" }}
                              source={require("../../../assets/team_logo.png")}
                          />
                          :
                          <Image
                              resizeMode="cover"
                              style={{ height: "100%", width: "100%" }}
                              source={{uri: pickedImagePath}}
                          />
                    }
                  </Pressable>
                </View>

                <View>
                  <Text style={{ fontSize: 12, color: colors.red }}>
                    Team Name
                  </Text>
                  <Text style={styles.pointName}>{teamName && teamName}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 3,
                  alignItems: "center",
                  justifyContent: "center",
                  // height: "100%",
                }}
              >
                <View style={{display: 'flex',flexDirection: "row",backgroundColor: 'red',width: 54,height: 54,borderRadius: 54/2,alignItems: 'center',justifyContent:'center'}}>
                  <Text style={{fontSize:35, fontWeight: 'bold',color: "#ffffff"}}>
                    {(totalPoint && totalPoint[0].point) || 0}
                  </Text>
                </View>
                {/* <Text
                  style={{

                  }}
                >

                </Text> */}
              </View>
              {/* </View> */}
            </View>
          </View>

          <LiveSection match_url={match_url} navigation={props.navigation} />

          <MatchButtons navigation={props.navigation} />

          <View style={{ width: "90%", alignSelf: "center" }}>
            <Image
              style={{ width: "100%", resizeMode: "contain" }}
              source={require("../../../assets/brand_gif.gif")}
            />
          </View>

          <PlayerFild players={select_players} onPress={onPress} />
        </ScrollView>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  pointBg: {
    width: "100%",
    // height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 10,
  },
  pointTextSec: {},
  pointName: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  highlightMatch: {
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: "black",
    width: "90%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },


});
