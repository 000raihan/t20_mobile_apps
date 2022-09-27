import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAllPlayers = createAsyncThunk(
  "players/setAllPlayers",
  async (id, thunkAPI) => {
    try {
      console.log("Id is : :::::::::::::::::: ", id);
      const headers = {
        "Content-type": "Application/json",
        Accept: "Application/json",
      };
      const res = await axios.get(`http://192.168.1.108:6044/api//player_list_by_id/${id}`);

      // console.log("res is : ---------- ",res)


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
  loading: false,
  error: null,
};

const allPlayerSlice = createSlice({
  name: "user",
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
