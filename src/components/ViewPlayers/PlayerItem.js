import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Checkbox from "expo-checkbox";
import colors from "../../../constants/colors";

const PlayerItem = (props) => {
  const [check, setCheck] = useState(false);
  const { name, code, role, selectedPlayres, setSeletedPlayres, user_id } = props;

  useEffect(()=>{

    if(check){
      setSeletedPlayres(...selectedPlayres, {team_name:name,user_id:user_id, player_code:code })
    }else{
      const newarr = selectedPlayres.filter(player => player.code !== code)
      setSeletedPlayres(newarr)
    }

  },[check])

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, height: "100%", width: "100%" }}>
        <Image
          resizeMode="contain"
          style={{ width: "100%", height: 40 }}
          source={require("../../../assets/img_circle.png")}
        />
      </View>
      <View style={{ flex: 4 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          {name && name}
        </Text>
        <Text style={{ color: "white" }}>{role && role}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Checkbox
          onTintColor={colors.red}
          onCheckColor={colors.primary}
          disabled={false}
          value={check}
          onValueChange={(newValue) => setCheck(newValue)}
          style={{ borderColor: colors.red }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default PlayerItem;
