import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { base_url } from "../../../constants/url";

export const getTeam = createAsyncThunk(
  "team_select/getTeam",
  async (id, thunkAPI) => {
    // const user_id = thunkAPI.getState(state=>state.user.user.id)
    // console.log("user id is : =============== ", id)
    try {
      const headers = {
        "Content-type": "Application/json",
        Accept: "Application/json"
      };
      const res =await axios.get(`${base_url}/player_select/${id}`);

      // console.log("res team Data is :::::::::::::::::::::: ", res.data.result);

      return res.data;
    } catch (error) {
      console.log("error is :---------::::::::::::::::::::::: ",error);
    }
  }
);

const initialState = {
  selectedPlayers:[],
  batsMan: [],
  bowler: [],
  allRounder: [],
  wiketKepper: [],
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: "team_select",
  initialState,
  reducers: {
    addTeam: (state, action) => {
      return {
        ...state,
        team: action.payload,
      };
    },
    addBatsMan: (state, action) => {
      console.log("add batsmant with", action.payload)
      return {
        ...state,
        batsMan :[...state.batsMan,action.payload ] 
      };
    },
    removeBatsMan: (state, action) => {
      console.log("redux called removed", action.payload)
      // const batsman =state.batsMan && state.batsMan.filter(man=> man.player_code !== action.payload)
      return{
        ...state,
        batsMan:state.batsMan.filter(player=>player.player_code !== action.payload)
      }
    },
    AddBowler: (state, action) => {
      return {
        ...state,
        bowler :[...state.bowler,action.payload ] 
      };
    },
    removeBowler: (state, action) => {
      return{
        ...state,
        bowler:state.bowler.filter(player=>player.player_code !== action.payload)
      }
    },
    AddAllrounder: (state, action) => {
      return {
        ...state,
        allRounder :[...state.allRounder,action.payload ] 
      };
    },
    removeAllRounder: (state, action) => {
      return{
        ...state,
        allRounder:state.allRounder.filter(player=>player.player_code !== action.payload)
      }
    },
    AddWicketKeeper: (state, action) => {
      return {
        ...state,
        wiketKepper :[...state.wiketKepper,action.payload ] 
      };
    },
    removeWicketKeeper: (state, action) => {
      return{
        ...state,
        wiketKepper:state.wiketKepper.filter(player=>player.player_code !== action.payload)
      }
    },
  },
  extraReducers:{
    [getTeam.pending]: (state) => {
        state.loading = true;
      },
      [getTeam.fulfilled]: (state, action) => {
        // console.log(action);
        state.loading = false;
        state.myPlayers = action.payload.result;
        state.batsMan = state.myPlayers.filter((p) => p.role == "Batsman");
        state.bowler = state.myPlayers.filter((p) => p.role == "Bowler");
        state.allRounder = state.myPlayers.filter((p) => p.role == "All-rounder");
        state.wiketKepper = state.myPlayers.filter((p) => p.role == "Wicket Keeper");
      },
      [getTeam.rejected]: (state, action) => {
        console.log(action);
        state.isLoading = false;
      },
  }
});

//for dispatch
export const { addTeam, addBatsMan, removeBatsMan, AddBowler, removeBowler, AddAllrounder, removeAllRounder, AddWicketKeeper, removeWicketKeeper } = teamSlice.actions;

//for configure store
export default teamSlice.reducer;
