import React, { useState } from "react";
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
} from "react-native";
import { Header } from "./components/Header";
import colors from "../../../constants/colors";
import PlayerItem from "../../components/ViewPlayers/PlayerItem";
import ViewTeamPlayer from "../../components/MyTeam/ViewTeamPlayer";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ViewPlayersScreen = ({ navigation }) => {
  return (
    <Provider>
      <Header navigation={navigation} />
      <View style={styles.fullPage}>
        <View style={styles.container}>
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: colors.red }}>Batsman</Text>
            <PlayerItem />
            <PlayerItem />
            <PlayerItem />
            <PlayerItem />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: colors.red }}>Allrounder</Text>
            <PlayerItem />
            <PlayerItem />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: colors.red }}>Wicket keeper</Text>
            <PlayerItem />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: colors.red }}>Wicket keeper</Text>
            <PlayerItem />
            <PlayerItem />
            <PlayerItem />
            <PlayerItem />
          </View>

          <View style={{ flexDirection: "row", alignItems:"center",marginTop:10}}>
            <View style={{flex:1}}>
              <TouchableOpacity activeOpacity={0.6}>
                <Image
                  resizeMode="contain"
                  style={{ width: "100%", height: 40 }}
                  source={require("../../../assets/previous.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex:5}}>
              <TouchableOpacity
                style={{ backgroundColor: colors.yellow, width: "100%",padding:7,borderRadius:2}}
                activeOpacity={0.6}
              >
                <Text style={{fontSize:16, textAlign:"center", }}>6 Players Selected</Text>
                <Text style={{fontSize:12, textAlign:"center", }}>5 Players Remaining</Text>
              </TouchableOpacity>
            </View>
          </View>
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
