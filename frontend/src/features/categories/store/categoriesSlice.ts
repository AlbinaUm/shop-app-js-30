import type {Category} from "../../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchCategories} from "./categoriesThunks.ts";

interface CategoriesState {
    categories: Category[]
    fetchLoading: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  fetchLoading: false,
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
            state.fetchLoading = false;
            state.categories = categories;
        });
    }
});

export const categoriesReducer = categoriesSlice.reducer;
