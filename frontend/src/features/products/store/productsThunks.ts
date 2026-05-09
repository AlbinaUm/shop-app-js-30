import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi.ts";
import type {Product, ProductMutation} from "../../../types";

export const fetchProducts = createAsyncThunk<Product[], string | null | undefined>(
    'products/fetchProducts',
    async (categoryQuery) => {
        let url = '/products';
        if (categoryQuery) url += '?category=' + categoryQuery;

        const response = await axiosApi.get<Product[]>(url);
        return response.data || [];
    }
);

export const deleteProductById = createAsyncThunk<void, string>(
    'products/deleteProductById',
    async (id) => {
        await axiosApi.delete('/products/' + id);
    }
);

export const createProduct = createAsyncThunk<void, ProductMutation>(
    'products/createProduct',
    async (productMutation) => {
        const formData = new FormData();
        const keys = Object.keys(productMutation) as (keyof ProductMutation)[];

        keys.forEach((key) => {
            const value = productMutation[key];

            if (value !== null) {
                if (value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        formData.append('images', value[i]);
                    }
                } else {
                    formData.append(key, value);
                }
            }
        });

        await axiosApi.post('/products', formData);
    }
);