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
  ImageBackground,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Header } from "./components/Header";
import colors from "../../../constants/colors";
import AddNewPlayer from "../../components/EditMyTeam/AddNewPlayer";
import * as SecureStore from "expo-secure-store";
import { CallApi } from "../ViewPlayersScreen/api/Api";
import { Ionicons } from "@expo/vector-icons";

import { useIsFocused } from "@react-navigation/native";

export const EditMyTeamScreen = (props) => {
  const { isEdit } = props.route.params;
  const { navigation } = props
  const isFocused = useIsFocused();
  const [userID, setUserID] = useState(null);
  const [selectedPlayres, setSelectedPlayers] = useState(null);

  const [bowlers, setBowlers] = useState([]);
  const [batters, setBatter] = useState([]);
  const [allRounder, setAllrounder] = useState([]);
  const [wiketKepper, setWeiketKeeper] = useState([]);

  const [deleted, setDeleted] = useState(false)

  const getSelectPlayerList = async (country_id) => {
    CallApi.player_select_list(country_id).then(
      async (result) => {
        if (result.success) {
          // console.log("=======",result.result);
          let data = [];
          for (let i = 0; i < result.result.length; i++) {
            const d = {
              team_name: result.result[i].team_name,
              user_id: result.result[i].user_id,
              player_code: result.result[i].player_code,
              player_name: result.result[i].player_name,
              player_image: result.result[i].player_image,
              role: result.result[i].role,
              is_delete: result.result[i].is_delete,
              id: result.result[i].id,
            };
            data.push(d);
          }
          setSelectedPlayers(data);
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



  // console.log("SELECTED PLAYERS 00000  --------------, ", selectedPlayres);

  // useEffect(() => {}, [team]);

  const save_select_list = async (data, newArrary) => {
    console.log("DATA IS : ----------", data)
    CallApi.delete_player_select(data).then(async (result) => {
      if (result.success) {
        console.log("success delte")
        setSelectedPlayers(newArrary);

      } else {
        Alert.alert('Error', result.message, [
          { text: 'yes', onPress: () => console.log('OK Pressed') },
        ]);
        // console.log("error", result.error);
        setDeleted(false)
      }
    }, (error) => {
      console.log("=====", error)
      alert("Invalid data.");
      setDeleted(false)
    }
    );
    // return;
  }

  const onDelete = async (code, name, id) => {
    console.log("ID IS : ", id);

    if (selectedPlayres.length === 16) {
      Alert.alert("Delete Player", "You can't delete & add player anymore. Alreay selected 16 players", [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed")
          },
          style: "cancel",
        },
        {
          text: "ok", onPress: async () => {
            console.log("ok Pressed")
            return null
          }
        },
      ]);
      return null;
    }

    if (selectedPlayres.length < 2) {
      return null
    }

    Alert.alert("Delete Player", "Confirm you to delete this player?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel Pressed")
        },
        style: "cancel",
      },
      {
        text: "yes", onPress: async () => {
          const newArrary = await selectedPlayres.filter(p => p.player_code !== code);

          await save_select_list({
            id: id,
            team_name: name,
            user_id: userID,
            player_code: code,
          }, newArrary);

          // console.log("RETURN VALUE IS: ", returnValue)

          // if (deleted) {
          //   alert("Hello")
          //   console.log("RETURN CONSOLE")
          //   setSelectedPlayers(newArrary);
          //   setDeleted(false)
          // }

        }
      },
    ]);
  };

  // console.log("NEW ARRAY IS :-- ", selectedPlayres);

  const addPress = () => {
    navigation.navigate("AllTeamScreen", { isEdit: true });
  };


  // ---------------------useEffect ----------------

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const userDetailsString = await SecureStore.getItemAsync("userDetails");
        const userDetails = JSON.parse(userDetailsString);
        setUserID(userDetails.id);
        // await getPlayerList(props.route.params.country_id);
        await getSelectPlayerList(userDetails.id);
      })();
    }

  }, [props, isFocused]);

  useEffect(() => {
    if (selectedPlayres) {
      setBatter(selectedPlayres.filter((p) => p.role == "Batsman" && p.is_delete === 0));
      setBowlers(selectedPlayres.filter((p) => p.role == "Bowler" && p.is_delete === 0));
      setAllrounder(selectedPlayres.filter((p) => p.role == "All-Rounder" && p.is_delete === 0));
      setWeiketKeeper(selectedPlayres.filter((p) => p.role == "Wicket Keeper" && p.is_delete === 0));
    }
    console.log(batters)
    console.log(bowlers)
    console.log(allRounder)
    console.log(wiketKepper)
  }, [selectedPlayres]);

  return (
    <Provider>
      <Header navigation={navigation} />
      <ImageBackground source={require('../../../assets/bg.png')} style={{ width: "100%", height: "100%",}}>
          <View style={styles.container}>
            {selectedPlayres ? (
              <ScrollView style={{ height:"90%", width:"100%"}}>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: colors.red }}>Batsman</Text>
                  {batters &&
                    batters.map((item) => (
                      <View
                        style={{
                          marginTop: 10,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        
                        }}
                      >
                        <View style={{ flex: 1, height: "100%", width: "100%" }}>
                          <Image
                            resizeMode="contain"
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                            source={{ uri: "http://116.68.200.97:6044/images/players/" + item.player_image }}
                          />
                        </View>
                        <View style={{ flex: 5 }}>
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
                          <Pressable onPress={() => {
                            onDelete(item.player_code, item.player_name, item.id).then(r => console.log(r))
                          }}>
                            <Ionicons
                              name="trash"
                              style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: colors.red,
                              }}
                            />
                          </Pressable>
                        </View>
                      </View>
                    ))}
                </View>

                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: colors.red }}>Bowler</Text>
                  {bowlers &&
                    bowlers.map((item) => (
                      <View
                        style={{
                          marginTop: 10,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ flex: 1, height: "100%", width: "100%" }}>
                          <Image
                            resizeMode="contain"
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                            source={{ uri: "http://116.68.200.97:6044/images/players/" + item.player_image }}
                          />
                        </View>
                        <View style={{ flex: 5 }}>
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
                          <Pressable onPress={() => onDelete(item.player_code, item.player_name, item.id)}>
                            <Ionicons
                              name="trash"
                              style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: colors.red,
                              }}
                            />
                          </Pressable>
                        </View>
                      </View>
                    ))}
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: colors.red }}>All-rounder</Text>
                  {allRounder &&
                    allRounder.map((item) => (
                      <View
                        style={{
                          marginTop: 10,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ flex: 1, height: "100%", width: "100%" }}>
                          <Image
                            resizeMode="contain"
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                            source={{ uri: "http://116.68.200.97:6044/images/players/" + item.player_image }}
                          />
                        </View>
                        <View style={{ flex: 5 }}>
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
                          <Pressable onPress={() => onDelete(item.player_code, item.player_name, item.id)}>
                            <Ionicons
                              name="trash"
                              style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: colors.red,
                              }}
                            />
                          </Pressable>
                        </View>
                      </View>
                    ))}
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: colors.red }}>Wicket keeper</Text>
                  {wiketKepper &&
                    wiketKepper.map((item) => (
                      <View
                        style={{
                          marginTop: 10,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ flex: 1, height: "100%", width: "100%" }}>
                          <Image
                            resizeMode="contain"
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                            source={{ uri: "http://116.68.200.97:6044/images/players/" + item.player_image }}
                          />
                        </View>
                        <View style={{ flex: 5 }}>
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
                          <Pressable onPress={() => onDelete(item.player_code, item.player_name, item.id)}>
                            <Ionicons
                              name="trash"
                              style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: colors.red,
                              }}
                            />
                          </Pressable>
                        </View>
                      </View>
                    ))}
                </View>
              </ScrollView>

            ) : (
              <ActivityIndicator size="large" color="#00ff00" />
            )}

            <View style={{paddingBottom:10}}>
              <Text style={{ color: colors.yellow, marginTop: 10, textAlign: "center", fontSize: 18 }}>
                You've Selected{" "}
                {(selectedPlayres && selectedPlayres.filter((r) => { return r.is_delete === 0; }).length) || 0} players
              </Text>
            </View>
            {
              selectedPlayres && selectedPlayres.filter((r) => { return r.is_delete === 0; }).length < 11 && (
                <Pressable
                  onPress={() => addPress()}
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    backgroundColor:"white",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 6,
                  }}
                >
                  <View>
                    <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
                      Add Player
                    </Text>
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Ionicons
                      name="add-circle"
                      style={{ fontSize: 25, fontWeight: "bold", color: "black" }}
                    />
                  </View>
                </Pressable>
              )
            }
          </View>

      </ImageBackground>
    </Provider >
  );
};

const styles = StyleSheet.create({
  // fullPage: {
  //   // backgroundColor: colors.primary,
  //   alignSelf:"center",
  //   width: "100%",
  //   alignItems:"center",
  //   alignItems:"center",
  //   // flex: 1,
  // },
  container: {
    // flex: 1,
    height:"91%",
    alignSelf:"center",
    width: "90%",
    alignSelf: "center",
  },
  HeadStyle: {},
  TableText: {},
});
