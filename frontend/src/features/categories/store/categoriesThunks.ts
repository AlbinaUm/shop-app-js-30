import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi.ts";
import type {Category} from "../../../types";


export const fetchCategories = createAsyncThunk<Category[], void>(
    'categories/fetchCategories',
    async () => {
        const response = await axiosApi.get<Category[]>('/categories');
        return response.data || [];
    }
);

