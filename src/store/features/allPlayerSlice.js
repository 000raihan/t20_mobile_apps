import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../utils/BaseUrl'

function player_select_list(user_id) {
  return fetch(`${API_URL}/player_select/${user_id}`)
      .then(response => response.json())
      .then(result => {
          return result;
      });
}

export const setAllPlayers = createAsyncThunk(
  "team_select/getTeam",
  async (user_id, thunkAPI) => {
    // const user_id = thunkAPI.getState(state=>state.user.user.id)
    // console.log("user id is : =============== ", id)
    console.log("IM CALLED", user_id)
    try {
      const res = await player_select_list(user_id)
      // console.log("RESULT IS :-------------------------------------- ", res)
      return res.result;
    } catch (error) {
      console.log("error is :---------::::::::::::::::::::::: ",error);
    }
  }
);

const initialState = {
  //   user: {
  //     name: "null",
  //     mobile: "01630542945",
  //     pin: "2323",
  //   },
  allPlayers: [],
  batsMan:[],
  bowler:[],
  allRounder:[],
  wiketKepper:[],
  loading: false,
  error: null,
};

const allPlayerSlice = createSlice({
  name: "allPlayers",
  initialState,
  reducers: {
    updatePlayers: (state, action) => {
        state.allPlayers = action.payload
    },
  },
  extraReducers:{
    [setAllPlayers.pending]: (state) => {
        state.loading = true;
      },
      [setAllPlayers.fulfilled]: (state, action) => {
        // console.log(action);
        state.loading = false;
        state.players = action.payload;
        // state.batsMan =  state.players.filter((p) => p.role == "Batsman");
        // state.bowler= state.players.filter((p) => p.role == "Bowler");
        // state.allRounder = state.players.filter((p) => p.role == "All-rounder");
        // state.wiketKepper =  state.players.filter((p) => p.role == "Wicket Keeper");
      },
      [setAllPlayers.rejected]: (state, action) => {
        console.log(action);
        state.isLoading = false;
      },
  }
});

//for dispatch
export const { updatePlayers } = allPlayerSlice.actions;

//for configure store
export default allPlayerSlice.reducer;
