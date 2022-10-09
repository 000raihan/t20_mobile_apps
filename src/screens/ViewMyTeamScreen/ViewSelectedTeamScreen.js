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

export const ViewSelectedTeamScreen = (props) => {
  const {isEdit, selectedPlayers:selectedPlayres} = props.route.params === undefined ? false : props.route.params;
  const { navigation } = props;
  const isFocused = useIsFocused();
  const [userID, setUserID] = useState(null);
  // const [selectedPlayres, setSelectedPlayers] = useState(null);
  const [totalPoint, setTotalPoint] = useState(null);

  // console.log("SELECTED PLAYER IS:", selectedPlayres)


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
                      return r.role === "Batsman"
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
                      return r.role === "Bowler"
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
                      return r.role === "All-Rounder"
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
                      return r.role === "Wicket Keeper" 
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
