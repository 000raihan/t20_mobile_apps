import React, { useState, useEffect } from "react";
import { Portal, Provider } from "react-native-paper";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Platform,
  FlatList,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { Header } from "./components/Header";
import colors from "../../../constants/colors";
import PlayerItem from "../../components/ViewPlayers/PlayerItem";
import ViewTeamPlayer from "../../components/MyTeam/ViewTeamPlayer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { CallApi } from "../ViewPlayersScreen/api/Api";
import * as SecureStore from "expo-secure-store";

import { useIsFocused } from "@react-navigation/native";
import {Storage} from "expo-storage";

export const ViewMyTeamScreen = (props) => {
  const {isEdit} = props.route.params === undefined ? false : props.route.params;
  const { navigation } = props;
  const isFocused = useIsFocused();
  const [userID, setUserID] = useState(null);
  const [selectedPlayres, setSelectedPlayers] = useState(null);
  const [totalPoint, setTotalPoint] = useState(null);


  const getSelectPlayerList = async (country_id) => {
    CallApi.player_select_list(country_id).then(
      async (result) => {
        if (result.success) {
          // console.log(result.result);
          let data = [];
          for (let i = 0; i < result.result.length; i++) {
            const d = {
              team_name: result.result[i].team_name,
              user_id: result.result[i].user_id,
              player_code: result.result[i].player_code,
              player_name: result.result[i].player_name,
              player_image: result.result[i].player_image,
              role: result.result[i].role,
              point: result.result[i].point,
              is_delete: result.result[i].is_delete,
            };
            data.push(d);
          }
          setSelectedPlayers(data);
          setTotalPoint(result.total_point[0].point)
        } else {
          Alert.alert("Error", result.message, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          // console.log("error", result.error);
        }
      },
      (error) => {
        console.log("=====", error);
        alert("Invalid data.");
      }
    );
  };


  useEffect(() => {
    if(isFocused){
      (async () => {
        const userDetailsString = await SecureStore.getItemAsync("userDetails");
        const userDetails = JSON.parse(userDetailsString);
        setUserID(userDetails.id);
        // await getPlayerList(props.route.params.country_id);
        if(isEdit){
          await getSelectPlayerList(userDetails.id);
        }else{
          const items = JSON.parse(
              await Storage.getItem({ key: 'select_player_list' })
          );
          let data = [];
          for (let i = 0; i < items.length; i++) {
            const d = {
              team_name: items[i].team_name,
              user_id: items[i].user_id,
              player_code: items[i].player_code,
              player_name: items[i].player_name,
              player_image: items[i].player_image,
              role: items[i].role,
              point: 0,
              is_delete: 0,
            };
            data.push(d);
          }
          setSelectedPlayers(data);
          setTotalPoint(0);
        }
      })();
    }

  }, [props, isFocused]);
  // console.log("selected players --------------, ", selectedPlayres);

  // useEffect(() => {}, [team]);

  return (
    <Provider>
      <Header navigation={navigation} />
      <View style={styles.fullPage}>
        <View style={styles.container}>
          <ScrollView style={{ height: "92%" }}>
            {selectedPlayres ? (
              <View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: colors.red }}>Batsman</Text>
                  {selectedPlayres
                    .filter((r) => {
                      return r.role === "Batsman" && r.is_delete === 0;
                    })
                    .map((item) => (
                      <View
                        style={{
                          marginTop: 10,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{ flex: 1, height: "100%", width: "100%" }}
                        >
                          <Image
                            resizeMode="contain"
                            style={{ width: "100%", height: 40 }}
                            source={{uri: "http://116.68.200.97:6044/images/players/"+item.player_image}}
                          />
                        </View>
                        <View style={{ flex: 4 }}>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 16,
                              fontWeight: "bold",
                            }}
                          >
                            {item.player_name && item.player_name}
                          </Text>
                          <Text style={{ color: "white" }}>
                            {item.role && item.role}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: colors.red,
                            }}
                          >
                           {item.point || 0}
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: colors.red }}>Bowler</Text>
                  {selectedPlayres
                    .filter((r) => {
                      return r.role === "Bowler" && r.is_delete === 0;
                    })
                    .map((item) => (
                      <View
                        style={{
                          marginTop: 10,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{ flex: 1, height: "100%", width: "100%" }}
                        >
                          <Image
                            resizeMode="contain"
                            style={{ width: "100%", height: 40 }}
                            source={{uri: "http://116.68.200.97:6044/images/players/"+item.player_image}}
                          />
                        </View>
                        <View style={{ flex: 4 }}>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 16,
                              fontWeight: "bold",
                            }}
                          >
                            {item.player_name && item.player_name}
                          </Text>
                          <Text style={{ color: "white" }}>
                            {item.role && item.role}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: colors.red,
                            }}
                          >
                           {item.point || 0}
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: colors.red }}>All-rounder</Text>
                  {selectedPlayres
                    .filter((r) => {
                      return r.role === "All-Rounder" && r.is_delete === 0;
                    })
                    .map((item) => (
                      <View
                        style={{
                          marginTop: 10,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{ flex: 1, height: "100%", width: "100%" }}
                        >
                          <Image
                            resizeMode="contain"
                            style={{ width: "100%", height: 40 }}
                            source={{uri: "http://116.68.200.97:6044/images/players/"+item.player_image}}
                          />
                        </View>
                        <View style={{ flex: 4 }}>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 16,
                              fontWeight: "bold",
                            }}
                          >
                            {item.player_name && item.player_name}
                          </Text>
                          <Text style={{ color: "white" }}>
                            {item.role && item.role}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: colors.red,
                            }}
                          >
                            {item.point || 0}
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: colors.red }}>Wicket keeper</Text>
                  {selectedPlayres
                    .filter((r) => {
                      return r.role === "Wicket Keeper" && r.is_delete === 0;
                    })
                    .map((item) => (
                      <View
                        style={{
                          marginTop: 10,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{ flex: 1, height: "100%", width: "100%" }}
                        >
                          <Image
                            resizeMode="contain"
                            style={{ width: "100%", height: 40 }}
                            source={{uri: "http://116.68.200.97:6044/images/players/"+item.player_image}}
                          />
                        </View>
                        <View style={{ flex: 4 }}>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 16,
                              fontWeight: "bold",
                            }}
                          >
                            {item.player_name && item.player_name}
                          </Text>
                          <Text style={{ color: "white" }}>
                            {item.role && item.role}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: colors.red,
                            }}
                          >
                           {item.point || 0}
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>
              </View>
            ) : (
              <ActivityIndicator size="large" color="#00ff00" />
            )}
          </ScrollView>

          {
            isEdit ?
                <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                      justifyContent: "center",
                    }}
                >
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{
                          backgroundColor: colors.yellow,
                          width: "90%",
                          padding: 7,
                          borderRadius: 2,
                        }}
                        activeOpacity={0.6}
                        onPress={() => {
                          navigation.navigate("EditTeamScreen", {isEdit: isEdit});
                        }}
                    >
                      <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                      >
                        Edit Team
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{
                          backgroundColor: colors.red,
                          width: "90%",
                          padding: 7,
                          borderRadius: 2,
                        }}
                        activeOpacity={0.6}
                    >
                      <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                      >
                        Total Point : {totalPoint}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                : null
          }

        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  fullPage: {
    backgroundColor: colors.primary,
    width: "100%",
    flex: 1,
  },
  container: {
    // flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  HeadStyle: {},
  TableText: {},
});
