import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

import colors from "../../../constants/colors";
import MainButton from "../MainButton";
import TableRow from "./TableRow";

const RankTable = (props) => {
  return (
    <View style={styles.container}>
        {/* table head ------------ */}
        <View style={{width:"100%",backgroundColor:"#00B1E5",paddingVertical:7, flexDirection:"row", justifyContent:"space-between",}}>
            <View style={{flex:1,}}><Text style={{textAlign:"center", fontWeight:"bold", color:"white"}}>Rank</Text></View>
            <View style={{flex:3,}}><Text style={{textAlign:"center",fontWeight:"bold", color:"white"}}>Name</Text></View>
            <View style={{flex:1}}><Text style={{textAlign:"center",fontWeight:"bold", color:"white"}}>Point</Text></View>
        </View>
        {/* table body ------------ */}
       <TableRow/>
       <TableRow/>
       <TableRow/>
       <TableRow/>
       <TableRow/>
       <TableRow/>
       <TableRow/>
       <TableRow/>
       <TableRow/>
       <TableRow/>
       <TableRow/>
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignSelf: "center",
        alignItems: "center",
        paddingHorizontal:10,
        paddingVertical:5,
        marginTop: 10,
      },
  header:{

  }
});

export default RankTable;
