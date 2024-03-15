import { configureStore } from "@reduxjs/toolkit";
import UserDataReducer from "../views/Login/LoginSlice";
import FilterDataReducer from "../components/FilterData/FilterSlice";
export const store = configureStore({
    reducer: {
        UserData: UserDataReducer,
        FilterData: FilterDataReducer,
    }
})