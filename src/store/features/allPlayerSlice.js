import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { base_url } from "../../../constants/url";

export const setAllPlayers = createAsyncThunk(
  "allPlayer/setAllPlayers",
  async (id, thunkAPI) => {
    try {
      // console.log("Id is : :::::::::::::::::: ", id);
      const headers = {
        "Content-type": "Application/json",
        Accept: "Application/json",
      };
      const res = await axios.get(`${base_url}/player_list_by_id/${id}`);
      // console.log("res data is : :::::::::::::::::: ", res.data.result);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  //   user: {
  //     name: "null",
  //     mobile: "01630542945",
  //     pin: "2323",
  //   },
  players: null,
  batsMan:[],
  bowler:[],
  allRounder:[],
  wiketKepper:[],
  loading: false,
  error: null,
};

const allPlayerSlice = createSlice({
  name: "allPlayer",
  initialState,
  reducers: {
    addPlayers: (state, action) => {
      return {
        ...state,
        players: action.payload,
      };
    },
  },
  extraReducers:{
    [setAllPlayers.pending]: (state) => {
        state.loading = true;
      },
      [setAllPlayers.fulfilled]: (state, action) => {
        // console.log(action);
        state.loading = false;
        state.players = action.payload.result;
        state.batsMan =  state.players.filter((p) => p.role == "Batsman");
        state.bowler= state.players.filter((p) => p.role == "Bowler");
        state.allRounder = state.players.filter((p) => p.role == "All-rounder");
        state.wiketKepper =  state.players.filter((p) => p.role == "Wicket Keeper");
      },
      [setAllPlayers.rejected]: (state, action) => {
        console.log(action);
        state.isLoading = false;
      },
  }
});

//for dispatch
export const { addPlayers } = allPlayerSlice.reducer;

//for configure store
export default allPlayerSlice.reducer;
