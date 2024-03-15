import { createSlice } from "@reduxjs/toolkit";

const userDataInitialState = {
    name: "",
    email: "",
    role: "",
    mobileNumber: "",
    allUserNameList: []
};

export const UserDataSlce = createSlice({
    name: "UserData",
    initialState: userDataInitialState,
    reducers: {
        SET_USER_DATA: (state, action) => {
            console.log('action:', action.payload)
            state.name = action?.payload?.name;
            state.email = action?.payload?.email;
            state.role = action?.payload?.role;
            state.mobileNumber = action?.payload?.mobileNumber;
        },
        USERS_LIST: (state,action) => {
            state.allUserNameList = action.payload.allUserNameList
        }
    }
});

export const { SET_USER_DATA, USERS_LIST } = UserDataSlce.actions;
export const  selectUserData = (state: any) => state.UserData;
export default UserDataSlce.reducer;