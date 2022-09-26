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


export const ViewMayTeamScreen = ({ navigation }) => {
  return (
    <Provider>
      <Header navigation={navigation} />
      <View style={styles.fullPage}>
        <View style={styles.container}>
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: colors.red }}>Batsman</Text>
            <ViewTeamPlayer />
            <ViewTeamPlayer />
            <ViewTeamPlayer />
            <ViewTeamPlayer />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: colors.red }}>Allrounder</Text>
            <ViewTeamPlayer />
            <ViewTeamPlayer />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: colors.red }}>Wicket keeper</Text>
            <ViewTeamPlayer />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: colors.red }}>Wicket keeper</Text>
            <ViewTeamPlayer />
            <ViewTeamPlayer />
            <ViewTeamPlayer />
            <ViewTeamPlayer />
          </View>

          <View style={{ flexDirection: "row", alignItems:"center",marginTop:10, justifyContent:"center" }}>
          <View style={{flex:1, }}>
              <TouchableOpacity
                style={{ backgroundColor: colors.yellow, width: "90%",padding:7,borderRadius:2}}
                activeOpacity={0.6}
              >
                <Text style={{fontSize:18,fontWeight:"bold", textAlign:"center", }}>Edit Team</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
              <TouchableOpacity
                style={{ backgroundColor: colors.red, width: "90%",padding:7,borderRadius:2}}
                activeOpacity={0.6}
              >
                <Text style={{fontSize:18,fontWeight:"bold", textAlign:"center", }}>Total Point : 1110</Text>
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
