import React, { useEffect, useState, useRef } from "react";
import { Portal, Provider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
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
import ConfettiCannon from 'react-native-confetti-cannon';
import Confetti from 'react-native-confetti';
import { Header } from "./components/Header";
import colors from "../../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import {CallApi} from "./api/Api";
import Checkbox from "expo-checkbox";
import { Storage } from 'expo-storage';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Ionicons } from "@expo/vector-icons";
import {updatePlayers} from '../../store/features/allPlayerSlice'

export const ViewPlayersScreen = (props) => {
  const {isEdit} = props.route.params;
  const isFocused = useIsFocused();
  const [playerList,setPlayerList] = useState([]);
  const [userID,setUserID] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isSelect, setIsSelected] = useState(false);
  const [showConfetti, setConfetti] = useState(false);




  useEffect( ()=>{
    if(isFocused){
      (async() => {
        const userDetailsString = await SecureStore.getItemAsync("userDetails");
        const userDetails = JSON.parse(userDetailsString);
        setUserID(userDetails.id);
          await getPlayerList(props.route.params.country_id);
          if(isEdit){
            const item = JSON.parse(
                await Storage.getItem({ key: 'select_player_list' })
            );
            if(item.length === 0){
              await getSelectPlayerList(userDetails.id);
            }else{
              const item = JSON.parse(
                  await Storage.getItem({ key: 'select_player_list' })
              );
              setSelectedPlayers(item);
            }
          }else{
            const item = JSON.parse(
                await Storage.getItem({ key: 'select_player_list' })
            );
            setSelectedPlayers(item);
          }

      }) ();
    }
  },[props, isFocused]);

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
            console.log("RESULT : ",result.result);
            let data = [];
            for(let i=0;i<result.result.length;i++){
              if(isEdit){
                if(!result.result[i].is_delete){
                  const d = {
                    id: result.result[i].id,
                    team_name: result.result[i].team_name,
                    user_id: result.result[i].user_id,
                    player_code: result.result[i].player_code,
                    role: result.result[i].role
                  };
                  data.push(d);
                }
              }else{
                const d = {
                  id: result.result[i].id,
                  team_name: result.result[i].team_name,
                  user_id: result.result[i].user_id,
                  player_code: result.result[i].player_code,
                };
                data.push(d);
              }
            }
            await Storage.setItem({
              key: "select_player_list",
              value: JSON.stringify(data)
            });
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


  const checkPlayerLogic = (data) =>{
    // console.log(data);
    const batsman = data.filter((r) => {return r.role === "Batsman"}).length;
    // console.log("BATSMAN : ", batsman);
    const wicketKeeper = data.filter((r) => {return r.role === "Wicket Keeper"}).length;
    const bowler = data.filter((r) => {return r.role === "Bowler"}).length;
    const allRounder = data.filter((r) => {return r.role === "All-Rounder"}).length;

    if(batsman < 2){
      Alert.alert('Caution', "You need to select minimum 2 Batsman", [
        { text: 'OK', onPress: async () => console.log("Press")},
      ]);
    }else if(bowler < 2){
      Alert.alert('Caution', "You need to select minimum 2 Bowler", [
        { text: 'OK', onPress: async () => console.log("Press")},
      ]);
    }else if(wicketKeeper == 0){
      Alert.alert('Caution', "You need to select minimum 1 Wicket Keeper", [
        { text: 'OK', onPress: async () => console.log("Press")},
      ]);
    }else if(allRounder < 2){
      Alert.alert('Caution', "You need to select minimum 2 All-rounder", [
        { text: 'OK', onPress: async () => console.log("Press")},
      ]);
    }else if(batsman > 4){
      Alert.alert('Validation', "Maximum 4 Batsman select", [
        { text: 'OK', onPress: async () => console.log("Press")},
      ]);
    }else if(bowler > 4){
      Alert.alert('Caution', "You can select maximum 4 Bowler", [
        { text: 'OK', onPress: async () => console.log("Press")},
      ]);
    }else if(wicketKeeper > 3){
      Alert.alert('Caution', "You can select maximum 3 Wicket Keeper", [
        { text: 'OK', onPress: async () => console.log("Press")},
      ]);
    }else if(allRounder > 4){
      Alert.alert('Caution', "You can select maximum 4 All-Rounder", [
        { text: 'OK', onPress: async () => console.log("Press")},
      ]);
    }else{
      return true;
    }
    return false;
  }

  const selectPlayer = async (details,value) => {

    // console.log(details)
    if(selectedPlayers.length < 11 || !value){
      const item = JSON.parse(
          await Storage.getItem({ key: 'select_player' })
      );
      let data = selectedPlayers;
      if(value){
        const d = {
          team_name: item.team_name,
          user_id: userID,
          player_code: details.player_code,
          player_name: details.player_name,
          role: details.role,
          player_image: details.player_image,
        };
        data.push(d);
      }else{
        data.splice(data.findIndex(v => v.player_code === details.player_code), 1);
      }

      setSelectedPlayers(data);
      setIsSelected(!isSelect);

      await Storage.setItem({
        key: "select_player_list",
        value: JSON.stringify(data)
      });

      // await save_select_list({
      //   id: item.id,
      //   team_name: item.team_name,
      //   user_id: `${userID}`,
      //   player_code: `${playerID}`,
      // });

      if(selectedPlayers.length >= 11){
        // console.log("SELECTPLAYER : ", selectedPlayers)
        if(checkPlayerLogic(selectedPlayers)){
          setConfetti(true);

          Alert.alert('Congratulations', "You have selected your best 11!", [
            { text: 'OK', onPress: async () => {
                const userDetailsString = await SecureStore.getItemAsync("userDetails");
                const userDetails = JSON.parse(userDetailsString);
                if(isEdit){
                  // console.log(data)
                  await update_select_list(data);
                  await Storage.setItem({
                    key: "select_player_list",
                    value: JSON.stringify([])
                  });
                  setConfetti(false);
                  props.navigation.navigate("HomeScreen");

                }else{
                  await save_select_list(data);
                  await Storage.setItem({
                    key: "select_player_list",
                    value: JSON.stringify([])
                  });
                  setConfetti(false);
                  props.navigation.navigate("BottomTabScreen", {result: userDetails});
                }
              }},
          ]);
        }else{
          setIsSelected(!isSelect);
        }
      }else if(selectedPlayers.length < 11){
        console.log("Below 11")
      }

    }else{
      Alert.alert('Validation', "You are not select over 11 players.", [
        { text: 'OK', onPress: () => {
          console.log('OK Pressed')
        }},
      ]);
    }
  };

  // console.log("selected players is : ",selectedPlayers)

  const save_select_list = async (data) => {
    CallApi.update_player_select(data).then(async (result)  => {
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

  const update_select_list = async (data) => {
    CallApi.update_player_select(data).then(async (result)  => {
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

  if(showConfetti){
    return (
      <View style={styles.c_container}>
        <ConfettiCannon count={200} fallSpeed={5000} origin={{ x: -10, y: 0 }} fadeOut={true} />
    </View>
    )

  }


  return (
    <Provider>
      <Header navigation={props.navigation}  title={props.route.params.country_name} />
    {/* {showConfetti && <View style={styles.c_container}>
    <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fadeOut={showConfetti} />
    </View>}   */}



      {/* {confetti &&  <Confetti ref={(node) => node}/>} */}
      { playerList.length !== 0 ?
          <View style={styles.fullPage}>
            <View style={styles.container}>
              <ScrollView style={styles.scrollStyle}>

                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: colors.red }}>Batsman</Text>
                  {
                    playerList.filter(r => {
                      return r.role === 'Batsman';
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
                                source={{uri: "http://116.68.200.97:6044/images/players/"+item.player_image}}
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
                                onValueChange={(newValue) => selectPlayer(item,newValue)}
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
                      return r.role === 'All-Rounder';
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
                                source={{uri: "http://116.68.200.97:6044/images/players/"+item.player_image}}
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
                                onValueChange={(newValue) => selectPlayer(item,newValue)}
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
                                source={{uri: "http://116.68.200.97:6044/images/players/"+item.player_image}}
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
                              onValueChange={(newValue) => selectPlayer(item,newValue)}
                            // -------------
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
                                source={{uri: "http://116.68.200.97:6044/images/players/"+item.player_image}}
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
                                onValueChange={(newValue) => selectPlayer(item,newValue)}
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

                <View style={{ flex: 5 }}>
                  <Pressable
                      style={{
                        backgroundColor: colors.yellow,
                        width: "100%",
                        padding: 7,
                        borderRadius: 2,
                      }}
                      activeOpacity={0.6}
                      onPress={() => props.navigation.navigate("MyTeamScreen", {isEdit:true, selectedPlayers:selectedPlayers})}
                  >
                    <Text style={{ fontSize: 16, textAlign: "center" }}>
                      {`${selectedPlayers.length} Players Selected`}
                    </Text>
                    <Text style={{ fontSize: 12, textAlign: "center" }}>
                      {`${11 - selectedPlayers.length} Players Remaining`}
                    </Text>
                  </Pressable>
                </View>

                {/* <View style={{ flex: 1, marginLeft: 10 }}>
                  <TouchableOpacity activeOpacity={0.6} onPress={()=>props.navigation.navigate("MyTeamScreen",{isEdit: false})}>
                    <Ionicons name="home" style={{fontSize:30, color:"white"}}/>

                  </TouchableOpacity>
                </View> */}

              </View>

            </View>
          </View>

          :null
      }
    </Provider>
  );
};

const styles = StyleSheet.create({
  c_container: {
    flex:1 ,
    height:"100%",
    width: "100%",
    alignSelf: "center",
    backgroundColor:"white"
  },
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
