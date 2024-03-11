import { configureStore } from "@reduxjs/toolkit";
import UserDataReducer from "../views/Login/LoginSlice";
export const store = configureStore({
    reducer: {
        UserData: UserDataReducer,
    }
})