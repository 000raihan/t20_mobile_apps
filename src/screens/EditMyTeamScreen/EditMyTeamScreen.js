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
import ViewTeamPlayer from "../../components/MyTeam/ViewTeamPlayer";
import EditPlayerView from "../../components/EditMyTeam/EditPlayerView";
import { TouchableOpacity } from "react-native-gesture-handler";
import AddNewPlayer from "../../components/EditMyTeam/AddNewPlayer";


export const EditMyTeamScreen = ({ navigation }) => {
  return (
    <Provider>
      <Header navigation={navigation} />
      <View style={styles.fullPage}>
        <View style={styles.container}>
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: colors.red }}>Batsman</Text>
            <EditPlayerView />
            <EditPlayerView />
            <EditPlayerView />
            <AddNewPlayer />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: colors.red }}>Allrounder</Text>
            <EditPlayerView />
            <EditPlayerView />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: colors.red }}>Wicket keeper</Text>
            <EditPlayerView />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: colors.red }}>Wicket keeper</Text>
            <EditPlayerView />
            <EditPlayerView />
            <EditPlayerView />
            <EditPlayerView />
          </View>

          <View style={{ alignItems:"center",marginTop:20 }}>
          <View style={{width:"90%"}}>
              <TouchableOpacity
                style={{ backgroundColor: colors.yellow, width: "100%",padding:7,borderRadius:2}}
                activeOpacity={0.6}
              >
                <Text style={{fontSize:18,fontWeight:"bold", textAlign:"center", }}>Save</Text>
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
