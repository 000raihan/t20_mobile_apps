import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../../constants/url';

export const userLogin = createAsyncThunk(
  "user/loginUser",
  async (data, thunkAPI) => {
    try {
      console.log("Im user Data ", data);
      const headers = {
        "Content-type": "Application/json",
        Accept: "Application/json",
      };
      const res =await axios.post(
        `${base_url}/login`,
        data,
        headers
      );

    //   console.log("User Data is : ", res.data.result);
      await AsyncStorage.setItem('user',JSON.stringify(res.data.result) )

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
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
  extraReducers:{
    [userLogin.pending]: (state) => {
        state.loading = true;
      },
      [userLogin.fulfilled]: (state, action) => {
        // console.log(action);
        state.loading = false;
        state.user = action.payload.result;
      },
      [userLogin.rejected]: (state, action) => {
        console.log(action);
        state.isLoading = false;
      },
  }
});

//for dispatch
export const { addUser } = userSlice.actions;

//for configure store
export default userSlice.reducer;
