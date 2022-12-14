import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
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

const WicketKepper = (props) => {
  const [check, setCheck] = useState(false);
  const { wiketKepper, user} = props;



  // useEffect(()=>{

  //   if(check){
  //     setSeletedPlayres(...selectedPlayres, {team_name:name,user_id:user_id, player_code:code })
  //   }else{
  //     const newarr = selectedPlayres.filter(player => player.code !== code)
  //     setSeletedPlayres(newarr)
  //   }

  // },[check])

  return (
    <View>
      {wiketKepper &&
        wiketKepper.map((player) => (
          <PlayerItem
            // selectedPlayres={selectedPlayres}
            // setSeletedPlayres={setSeletedPlayres}
            addValue={addBatsMan}
            removeValue={removeBatsMan}
            key={player.code}
            name={player.player_name}
            role={player.role}
            code={player.player_code}
            user_id={user.id}
            stateValue={wiketKepper}
          />
        ))}
    </View>
  );
};

export default WicketKepper;
