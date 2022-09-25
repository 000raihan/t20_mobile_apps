import React, { useState } from "react";
import { Portal, Provider } from "react-native-paper";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  FlatList,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import { Header } from "../NotificationScreen/components/Header";
import colors from "../../../constants/colors";


export const ViewMayTeamScreen = ({ navigation }) => {
  return (
    <Provider>
      <Header navigation={navigation} />
      <View style={styles.fullPage}>
        <View style={styles.container}>
          <Text>Hello My Team</Text>
        </View>
      </View>
      {/* <View
        style={{
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text style={{ color: colors.red, fontWeight: "bold", fontSize: 16 }}>
        ViewPlayersScreen
        </Text>
      </View> */}
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
