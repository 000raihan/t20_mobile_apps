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

const Bowler = (props) => {
  const {bowler, user } = props;

  return (
    <View>
      {bowler &&
        bowler.map((player) => (
          <PlayerItem
            // selectedPlayres={selectedPlayres}
            // setSeletedPlayres={setSeletedPlayres}
            addValue={AddBowler}
            removeValue={removeBowler}
            key={player.code}
            name={player.player_name}
            role={player.role}
            code={player.player_code}
            user_id={user.id}
            stateValue={bowler}
          />
        ))}
    </View>
  );
};

export default Bowler;
