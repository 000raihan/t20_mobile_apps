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
import Colors from "../../utils/Colors";
import { Header } from "../NotificationScreen/components/Header";
import { WebView } from "react-native-webview";
import { Table, Row, Rows } from 'react-native-table-component';
import colors from "../../../constants/colors";
import RankTable from "../../components/LeaderBoard/RankTable";

export const LeaderBoardScreen = ({ navigation }) => {
//   const headTable = useState(["Rank", "Name", "Points"]);
//   const dataTable = useState([
//     ["1", "Mushfique", "280"],
//     ["2", "Shakib", "150"],
//     ["3", "Mashrafee", "280"],
//     ["4", "Mahmudlullah", "280"],
//     ["5", "Shohan", "280"],
//     ["6", "Rubel", "280"],
//     ["7", "Taskin", "280"],
//   ]);
  return (
    <Provider>
      <Header navigation={navigation} />
      <View
        style={{
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text style={{ color: colors.red, fontWeight: "bold", fontSize: 16 }}>
          LEADER BOARD
        </Text>
      </View>
      <View style={styles.container}>
       
        <RankTable/>
      
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  HeadStyle: {},
  TableText: {},
});
