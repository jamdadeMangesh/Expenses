import { createSlice } from "@reduxjs/toolkit";

const filterDataInitialState = {
	financialYear: "",
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
		SET_FINANCIAL_YEAR: (state, action) => {
			state.financialYear = action.payload;
		},
        SET_FILTER_TYPE: (state, action) => {
            state.filterType = action.payload;
        },
        SET_CATEGORY_LIST: (state, action) => {
            state.selectedCategoryList = action.payload;
        }
	},
});

export const { SET_FINANCIAL_YEAR, SET_USERNAME, SET_FILTER_TYPE, SET_CATEGORY_LIST } = FilterDataSlice.actions;
export const selectFilterData = (state: any) => state.FilterData;
export default FilterDataSlice.reducer;
