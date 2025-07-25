import { createSlice } from "@reduxjs/toolkit";

const filterDataInitialState = {
  financialYear: "",
  preferenceValues: "",
  selectedFilteredUsername: "",
  filterType: "",
  selectedCategoryList: [],
  updatedTransactionId: "",
  transactionType: "",
  listType: false,
  searchTerm: "",
  totalIncome: "",
  totalExpense: "",
};
export const FilterDataSlice = createSlice({
  name: "FilterData",
  initialState: filterDataInitialState,
  reducers: {
    SET_USERNAME: (state, action) => {
      state.selectedFilteredUsername = action?.payload;
    },
    SET_FINANCIAL_YEAR: (state, action) => {
      state.financialYear = action.payload;
    },
    SET_FILTER_TYPE: (state, action) => {
      state.filterType = action.payload;
    },
    SET_CATEGORY_LIST: (state, action) => {
      state.selectedCategoryList = action.payload;
    },
    SET_UPDATED_TRANSACTION_ID: (state, action) => {
      state.updatedTransactionId = action.payload.updatedTransactionId;
      state.transactionType = action.payload.transactionType;
    },
    SET_TYPE: (state, action) => {
      state.listType = action.payload;
    },
    SET_SEARCH_TERM: (state, action) => {
      state.searchTerm = action.payload;
    },
    SET_TOTAL_INCOME: (state, action) => {
      state.totalIncome = action.payload;
    },
    SET_TOTAL_EXPENSE: (state, action) => {
      state.totalExpense = action.payload;
    },
  },
});

export const {
  SET_FINANCIAL_YEAR,
  SET_USERNAME,
  SET_FILTER_TYPE,
  SET_CATEGORY_LIST,
  SET_UPDATED_TRANSACTION_ID,
  SET_TYPE,
  SET_SEARCH_TERM,
  SET_TOTAL_INCOME,
  SET_TOTAL_EXPENSE,
} = FilterDataSlice.actions;
export const selectFilterData = (state: any) => state.FilterData;
export default FilterDataSlice.reducer;
