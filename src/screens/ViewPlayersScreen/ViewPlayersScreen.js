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
  useWindowDimensions,
} from "react-native";
import { Header } from "./components/Header";
import colors from "../../../constants/colors";
import PlayerItem from "../../components/ViewPlayers/PlayerItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { setAllPlayers } from "../../store/features/allPlayerSlice";
import BatsMan from "./components/BatsMan";
import AllRounder from "./components/AllRounder";
import WicketKepper from "./components/WicketKepper";
import Bowler from "./components/Bowler";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { base_url } from "../../../constants/url";

export const ViewPlayersScreen = ({ navigation }) => {
  const { players, batsMan, bowler, allRounder, wiketKepper } = useSelector(
    (state) => state.players
  );

  const {
    team: myTeam,
    myPlayers,
    batsMan: myBatsman,
    bowler: mybowler,
    allRounder: myAlrounder,
    wiketKepper: mywiketKepper,
  } = useSelector((state) => state.team);

  const [subAarray, setSubArray] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const { team } = useSelector((state) => state.team);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setAllPlayers(team.country_id));
  }, []);

  useEffect(() => {
    setSelectedPlayers([
      ...myBatsman,
      ...mybowler,
      ...myAlrounder,
      ...mywiketKepper,
    ]);
  }, [myBatsman, mybowler, mybowler, mywiketKepper]);

  // console.log("players is : ------------------------", players);
  // console.log("btter is -------: ", bowler);

  const submitPlayers = () => {
    const newArray = selectedPlayers.map((player) => ({
      team_name: player.team_name,
      player_code: player.player_code,
      user_id: player.user_id,
    }));
    // console.log("new Players is : ", newArray)

    if (newArray.length > 0) {
     
      axios.post(`${base_url}/save_player_select`, newArray).then((res) => {
        navigation.navigate("HomeScreen");
      });
    }
  };
  return (
    <Provider>
      <Header navigation={navigation} title={team && team.country_name} />
      {players && (
        <View style={styles.fullPage}>
          <View style={styles.container}>
            <ScrollView style={styles.scrollStyle}>
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: colors.red }}>Batsman</Text>
                <BatsMan batsMan={batsMan} user={user}  />
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: colors.red }}>Allrounder</Text>
                <AllRounder allRounder={allRounder} user={user}  />
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: colors.red }}>Wicket keeper</Text>
                <WicketKepper wiketKepper={wiketKepper} user={user}  />
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: colors.red }} user={user}>
                  Bowler
                </Text>
                <Bowler bowler={bowler} user={user}/>
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
                    {/* 5 Players Remaining */}
                  </Text>
                  <Text style={{ fontSize: 12, textAlign: "center" }}>
                    {`${11 - selectedPlayers.length} Players Remaining`}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      )}
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
