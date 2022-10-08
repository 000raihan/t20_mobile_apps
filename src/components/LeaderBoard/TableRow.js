import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../../../constants/colors";

const TableRow = (props) => {
  return (
    <View
      style={{
        width: "100%",
        // marginTop: 5,
        // borderWidth: .5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical:10
      }}
    >
      <View style={{ flex: 1, flexDirection:"row",justifyContent:"center", alignItems:"center" }}>
        <Text style={{ textAlign: "center" }}>1</Text>
      </View>
      <View style={{ flex: 4, flexDirection: "row", justifyContent: "flex-start", alignItems:"center" }}>
        {/* <View style={{ height: 30, width: 30}}> */}
          <Image resizeMode="cover" style={{ width:30, height: 30, borderRadius:1000, marginRight:10 }} source={require("../../../assets/shakib.png")} />
        {/* </View> */}
      <View>
      <Text style={{ textAlign: "center", fontSize:15, fontWeight:"bold"}}>Shakib</Text>
      <Text style={{ textAlign: "center", color:colors.red, fontSize:10,}}>Allrounder</Text>
      </View>
        
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: "center", fontWeight:"bold" }}>255</Text>
      </View>
    </View>
  );
};

export default TableRow;
