import React, { useEffect, useState } from "react";
import { Portal, Provider } from "react-native-paper";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Platform,
  FlatList,
  ScrollView,
  useWindowDimensions, Alert,
} from "react-native";
import { Header } from "./components/Header";
import colors from "../../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { setAllPlayers } from "../../store/features/allPlayerSlice";
import BatsMan from "./components/BatsMan";
import AllRounder from "./components/AllRounder";
import WicketKepper from "./components/WicketKepper";
import Bowler from "./components/Bowler";

import { base_url } from "../../../constants/url";
import * as SecureStore from "expo-secure-store";
import {CallApi} from "./api/Api";
import PlayerItem from "../../components/ViewPlayers/PlayerItem";
import {addBatsMan, removeBatsMan} from "../../store/features/teamSlice";
import Checkbox from "expo-checkbox";
import { Storage } from 'expo-storage';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export const ViewPlayersScreen = (props) => {
  const [playerList,setPlayerList] = useState([]);
  const [userID,setUserID] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isSelect, setIsSelected] = useState(false);


  useEffect( ()=>{
    (async() => {
      const userDetailsString = await SecureStore.getItemAsync("userDetails");
      const userDetails = JSON.parse(userDetailsString);
      setUserID(userDetails.id);
        await getPlayerList(props.route.params.country_id);
        await getSelectPlayerList(userDetails.id);

    }) ();
  },[]);

  const getPlayerList = async (country_id) => {
    CallApi.player_list(country_id).then(async (result)  => {
          if(result.success){
            setPlayerList(result.result);
          }else{
            Alert.alert('Error', result.message, [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            // console.log("error", result.error);
          }
        },(error) => {
          console.log("=====",error)
          alert("Invalid data.");
        }
    );
  };

  const getSelectPlayerList = async (country_id) => {
    CallApi.player_select_list(country_id).then(async (result)  => {
          if(result.success){
            // console.log(result.result);
            let data = [];
            for(let i=0;i<result.result.length;i++){
              const d = {
                team_name: result.result[i].team_name,
                user_id: result.result[i].user_id,
                player_code: result.result[i].player_code,
              };
              data.push(d);
            }
            setSelectedPlayers(data);
          }else{
            Alert.alert('Error', result.message, [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            // console.log("error", result.error);
          }
        },(error) => {
          console.log("=====",error);
          alert("Invalid data.");
        }
    );
  };


  const selectPlayer = async (playerID,value) => {
    if(selectedPlayers.length < 11){
      const item = JSON.parse(
          await Storage.getItem({ key: 'select_player' })
      );
      let data = selectedPlayers;
      if(value){
        const d = {
          team_name: item.team_name,
          user_id: userID,
          player_code: playerID,
        };
        data.push(d);
      }else{
        data.splice(data.findIndex(v => v.player_code === playerID), 1);
      }
      setSelectedPlayers(data);
      setIsSelected(!isSelect);

      await save_select_list({
        team_name: item.team_name,
        user_id: userID,
        player_code: playerID,
      });

    }else{
      Alert.alert('Validation', "Ypu are not select over 11 players.", [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const save_select_list = async (data) => {
    CallApi.save_update_player_select(data).then(async (result)  => {
          if(result.success){
            // console.log(result.result);
          }else{
            Alert.alert('Error', result.message, [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            // console.log("error", result.error);
          }
        },(error) => {
          console.log("=====",error)
          alert("Invalid data.");
        }
    );
  }

  return (
    <Provider>
      <Header navigation={props.navigation} title="TEAm" />
      { playerList.length !== 0 ?
          <View style={styles.fullPage}>
            <View style={styles.container}>
              <ScrollView style={styles.scrollStyle}>

                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: colors.red }}>Batsman</Text>
                  {
                    playerList.filter(r => {
                      return r.role === 'Batter';
                    }).map((item) => (
                        <View style={{
                          marginTop: 10,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",}}>
                          <View style={{ flex: 1, height: "100%", width: "100%" }}>
                            <Image
                                resizeMode="contain"
                                style={{ width: "100%", height: 40 }}
                                source={require("../../../assets/img_circle.png")}
                            />
                          </View>
                          <View style={{ flex: 4 }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                              {item.player_name && item.player_name}
                            </Text>
                            <Text style={{ color: "white" }}>{item.role && item.role}</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Checkbox
                                onTintColor={colors.red}
                                onCheckColor={colors.primary}
                                disabled={false}
                                style={{ borderColor: colors.red }}
                                value={selectedPlayers.find(o => o.player_code === item.player_code) !== undefined ? true : false}
                                onValueChange={(newValue) => selectPlayer(item.player_code,newValue)}
                            />
                          </View>
                        </View>
                    ))
                  }
                </View>

                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: colors.red }}>Allrounder</Text>
                  {
                    playerList.filter(r => {
                      return r.role === 'All-rounder';
                    }).map((item) => (
                        <View style={{
                          marginTop: 10,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",}}>
                          <View style={{ flex: 1, height: "100%", width: "100%" }}>
                            <Image
                                resizeMode="contain"
                                style={{ width: "100%", height: 40 }}
                                source={require("../../../assets/img_circle.png")}
                            />
                          </View>
                          <View style={{ flex: 4 }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                              {item.player_name && item.player_name}
                            </Text>
                            <Text style={{ color: "white" }}>{item.role && item.role}</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Checkbox
                                onTintColor={colors.red}
                                onCheckColor={colors.primary}
                                disabled={false}
                                style={{ borderColor: colors.red }}
                                value={selectedPlayers.find(o => o.player_code === item.player_code) !== undefined ? true : false}
                                onValueChange={(newValue) => selectPlayer(item.player_code,newValue)}
                            />
                          </View>
                        </View>
                    ))
                  }
                </View>

                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: colors.red }}>Wicket keeper</Text>
                  {
                    playerList.filter(r => {
                      return r.role === 'Wicket Keeper';
                    }).map((item) => (
                        <View style={{
                          marginTop: 10,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",}}>
                          <View style={{ flex: 1, height: "100%", width: "100%" }}>
                            <Image
                                resizeMode="contain"
                                style={{ width: "100%", height: 40 }}
                                source={require("../../../assets/img_circle.png")}
                            />
                          </View>
                          <View style={{ flex: 4 }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                              {item.player_name && item.player_name}
                            </Text>
                            <Text style={{ color: "white" }}>{item.role && item.role}</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Checkbox
                                onTintColor={colors.red}
                                onCheckColor={colors.primary}
                                disabled={false}
                                value={selectedPlayers.find(o => o.player_code === item.player_code) !== undefined ? true : false}
                                onValueChange={(newValue) => selectPlayer(item.player_code,newValue)}
                            />
                          </View>
                        </View>
                    ))
                  }
                </View>

                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: colors.red }}>Bowler</Text>
                  {
                    playerList.filter(r => {
                      return r.role === 'Bowler';
                    }).map((item) => (
                        <View style={{
                          marginTop: 10,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",}}>
                          <View style={{ flex: 1, height: "100%", width: "100%" }}>
                            <Image
                                resizeMode="contain"
                                style={{ width: "100%", height: 40 }}
                                source={require("../../../assets/img_circle.png")}
                            />
                          </View>
                          <View style={{ flex: 4 }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                              {item.player_name && item.player_name}
                            </Text>
                            <Text style={{ color: "white" }}>{item.role && item.role}</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Checkbox
                                onTintColor={colors.red}
                                onCheckColor={colors.primary}
                                disabled={false}
                                style={{ borderColor: colors.red }}
                                value={selectedPlayers.find(o => o.player_code === item.player_code) !== undefined ? true : false}
                                onValueChange={(newValue) => selectPlayer(item.player_code,newValue)}
                            />
                          </View>
                        </View>
                    ))
                  }
                </View>

              </ScrollView>

              <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
              >
                <View style={{ flex: 1 }}>
                  <TouchableOpacity activeOpacity={0.6}>
                    <Image
                        resizeMode="contain"
                        style={{ width: "100%", height: 40 }}
                        source={require("../../../assets/previous.png")}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 5 }}>
                  <Pressable
                      style={{
                        backgroundColor: colors.yellow,
                        width: "100%",
                        padding: 7,
                        borderRadius: 2,
                      }}
                      activeOpacity={0.6}
                      onPress={() => submitPlayers()}
                  >
                    <Text style={{ fontSize: 16, textAlign: "center" }}>
                      {selectedPlayers.length == 11
                          ? "Save your Team"
                          : `${selectedPlayers.length} Players Selected`}
                    </Text>
                    <Text style={{ fontSize: 12, textAlign: "center" }}>
                      {`${11 - selectedPlayers.length} Players Remaining`}
                    </Text>
                  </Pressable>
                </View>
              </View>

            </View>
          </View>

          :null
      }
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
  scrollStyle: {
    height: "90%",
  },
});
