import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

import colors from "../../../constants/colors";
import StandingTableRow from "./StandingTableRow";

const TableView = (props) => {
  return (
    <View style={styles.container}>
        {/* table head ------------ */}
        <View style={{width:"100%",backgroundColor:colors.gray,paddingVertical:5,paddingHorizontal:3, flexDirection:"row", justifyContent:"space-between",}}>
            <View style={{flex:1,}}><Text style={{textAlign:"center", fontWeight:"bold", color:colors.primary, opacity:.5}}>Pos</Text></View>
            <View style={{flex:3,}}><Text style={{textAlign:"center",fontWeight:"bold", color:colors.primary, opacity:.5}}>Team</Text></View>
            <View style={{flex:1,}}><Text style={{textAlign:"center",fontWeight:"bold", color:colors.primary, opacity:.5}}>PLD</Text></View>
            <View style={{flex:3}}><Text style={{textAlign:"center",fontWeight:"bold", color:colors.primary, opacity:.5}}>NRR</Text></View>
            <View style={{flex:1}}><Text style={{textAlign:"center",fontWeight:"bold", color:colors.primary, opacity:.5}}>Pts</Text></View>
        </View>
        {/* table body ------------ */}
        <View style={{marginTop:10}}>
        <StandingTableRow/>
        <StandingTableRow/>
        <StandingTableRow/>
        <StandingTableRow/>
        <StandingTableRow/>
        <StandingTableRow/>
        <StandingTableRow/>
        </View>

    </View>

  );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // paddingHorizontal:10,
        // paddingVertical:5,
        marginTop: 10,
      },
  header:{

  }
});

export default TableView;
