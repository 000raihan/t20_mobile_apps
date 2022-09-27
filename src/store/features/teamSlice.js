import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userTeam = createAsyncThunk(
  "user/loginUser",
  async (data, thunkAPI) => {
    const user_id = thunkAPI.getState(state.user.user.user_id)
    try {
      console.log("Im user Data ", data);
      const headers = {
        "Content-type": "Application/json",
        Accept: "Application/json",
      };
      const res =await axios.post(
        `http://192.168.1.106:6044/api/login`,
        data,
        headers
      );

    //   console.log("User Data is : ", res.data.result);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  team: null,
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addTeam: (state, action) => {
      return {
        ...state,
        team: action.payload,
      };
    },
  },
  extraReducers:{
    [userTeam.pending]: (state) => {
        state.loading = true;
      },
      [userTeam.fulfilled]: (state, action) => {
        // console.log(action);
        state.loading = false;
        state.user = action.payload.result;
      },
      [userTeam.rejected]: (state, action) => {
        console.log(action);
        state.isLoading = false;
      },
  }
});

//for dispatch
export const { addTeam } = teamSlice.actions;

//for configure store
export default teamSlice.reducer;
