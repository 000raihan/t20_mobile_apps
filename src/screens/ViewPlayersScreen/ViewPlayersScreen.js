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
import ViewTeamPlayer from "../../components/MyTeam/ViewTeamPlayer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { setAllPlayers } from "../../store/features/allPlayerSlice";

export const ViewPlayersScreen = ({ navigation }) => {
  const [batter, setBatter] = useState();
  const [bowler, setBowler] = useState();
  const [allRounder, setAllrounder] = useState();
  const [wicketKipper, setWiketKipper] = useState();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { team } = useSelector((state) => state.team);
  const { players } = useSelector((state) => state.players);
  const [allPlayers, setAllPlayer] = useState([]);
  const [selectedPlayres, setSeletedPlayres] = useState([]);

  useEffect(() => {
    dispatch(setAllPlayers(team.country_id));
    setAllPlayer(players);
  }, []);

  useEffect(() => {
    if (players) {
      setBatter(players.filter((p) => p.role == "Batter"));
      setBowler(players.filter((p) => p.role == "Bowler"));
      setAllrounder(players.filter((p) => p.role == "All-rounder"));
      setWiketKipper(players.filter((p) => p.role == "Wicket Keeper"));
    }
  }, [players]);

  console.log("players is : ------------------------", players);
  console.log("btter is -------: ", bowler);
  return (
    <Provider>
      <Header navigation={navigation} title={team && team.country_name} />
      {players && (
        <View style={styles.fullPage}>
          <View style={styles.container}>
            <ScrollView style={styles.scrollStyle}>
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: colors.red }}>Batsman</Text>
                {batter &&
                  batter.map((player) => {
                    return (
                      <PlayerItem
                        selectedPlayres={selectedPlayres}
                        setSeletedPlayres={setSeletedPlayres}
                        key={player.code}
                        name={player.player_name}
                        role={player.role}
                        code={player.player_code}
                        user_id = {user.user_id}
                      />
                    );
                  })}
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: colors.red }}>Allrounder</Text>
                {allRounder &&
                  allRounder.map((player) => (
                    <PlayerItem
                      selectedPlayres={selectedPlayres}
                      setSeletedPlayres={setSeletedPlayres}
                      key={player.code}
                      name={player.player_name}
                      role={player.role}
                      code={player.player_code}
                    />
                  ))}
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: colors.red }}>Wicket keeper</Text>
                {wicketKipper &&
                  wicketKipper.map((player) => (
                    <PlayerItem
                      selectedPlayres={selectedPlayres}
                      setSeletedPlayres={setSeletedPlayres}
                      key={player.code}
                      name={player.player_name}
                      role={player.role}
                      code={player.player_code}
                    />
                  ))}
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: colors.red }}>Bowler</Text>
                {bowler &&
                  bowler.map((player) => (
                    <PlayerItem
                      selectedPlayres={selectedPlayres}
                      setSeletedPlayres={setSeletedPlayres}
                      key={player.code}
                      name={player.player_name}
                      role={player.role}
                      code={player.player_code}
                    />
                  ))}
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
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.yellow,
                    width: "100%",
                    padding: 7,
                    borderRadius: 2,
                  }}
                  activeOpacity={0.6}
                >
                  <Text style={{ fontSize: 16, textAlign: "center" }}>
                    6 Players Selected
                  </Text>
                  <Text style={{ fontSize: 12, textAlign: "center" }}>
                    5 Players Remaining
                  </Text>
                </TouchableOpacity>
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
