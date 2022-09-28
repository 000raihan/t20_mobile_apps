import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import PlayerItem from "../../../components/ViewPlayers/PlayerItem";

import {
  addTeam,
  addBatsMan,
  removeBatsMan,
  AddBowler,
  removeBowler,
  AddAllrounder,
  removeAllRounder,
  AddWicketKeeper,
  removeWicketKeeper,
} from "../../../store/features/teamSlice";

const BatsMan = (props) => {
  //   const [check, setCheck] = useState(false);
  const {batsMan:batter} = useSelector(state=> state.team)
  const { batsMan, } = props;
  const {user} = useSelector(state => state.user)

  console.log("May batsmant Value is : 00000000000000999999999 ---- ", batter)
//   console.log("use is : ", user)

  return (
    <View>
      {batsMan &&
        batsMan.map((player) => {
          return (
            <PlayerItem
              //   isSelected={isSelected}
              //   setSelection={setSelection}
              addValue={addBatsMan}
              removeValue={removeBatsMan}
              key={player.code}
              name={player.player_name}
              role={player.role}
              code={player.player_code}
              user_id={user.id}
            />
          );
        })}
    </View>
  );
};

export default BatsMan;
