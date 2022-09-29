// import { configureStore } from '@reduxjs/toolkit';
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import teamReducer from './features/teamSlice';
import allPlayerSlice from "./features/allPlayerSlice";

export default configureStore({
  reducer: {
    user : userReducer,
    team : teamReducer,
    players : allPlayerSlice
  },
});