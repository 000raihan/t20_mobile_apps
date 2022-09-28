import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Checkbox from "expo-checkbox";
import colors from "../../../constants/colors";
import { useDispatch } from "react-redux";

const PlayerItem = (props) => {
  const [isSelected, setSelection] = useState(false);
  const { name, code, role, addValue, removeValue, user_id, stateValue } =
    props;

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isSelected) {
  //     dispatch(
  //       addValue({ team_name: name, player_code: code, user_id: user_id })
  //     );
  //   } else {
  //     // const newarr = selectedPlayres.filter(player => player.code !== code)

  //     dispatch(removeValue(code));
  //   }
  // }, [isSelected]);

  const changeCheck = (value) => {
    setSelection(value);

    if (value) {
      dispatch(
        addValue({ team_name: name, player_code: code, user_id: user_id })
      );
    } else {
      dispatch(removeValue(code));
    }
    // console.log("------------------",value)
  };

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
          value={isSelected}
          onValueChange={(value) => changeCheck(value)}
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
