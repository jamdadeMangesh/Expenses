import { createSlice } from "@reduxjs/toolkit";

const filterDataInitialState = {
	year: "",
	preferenceValues: "",
    selectedFilteredUsername: "",
    filterType: "",
    selectedCategoryList: []
};
export const FilterDataSlice = createSlice({
	name: "FilterData",
	initialState: filterDataInitialState,
	reducers: {
        SET_USERNAME:(state, action) => {
            state.selectedFilteredUsername = action?.payload
        },
		ADD_FILTER_DATA: (state, action) => {
			state.year = action.payload.year;
			state.preferenceValues = action.payload.preferenceValues;
		},
        SET_FILTER_TYPE: (state, action) => {
            state.filterType = action.payload;
            console.log('state.filterType:', state.filterType);
        },
        SET_CATEGORY_LIST: (state, action) => {
            state.selectedCategoryList = action.payload;
        }
	},
});

export const { ADD_FILTER_DATA, SET_USERNAME, SET_FILTER_TYPE, SET_CATEGORY_LIST } = FilterDataSlice.actions;
export const selectFilterData = (state: any) => state.FilterData;
export default FilterDataSlice.reducer;
