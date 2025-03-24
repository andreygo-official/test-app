import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'http://localhost:3001/products';

export const fetchProducts = createAsyncThunk (
    'products/fetchProducts',
    async () => {
        const response = await axios.get(URL)
        return response.data
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle'
    },
    reducers: {
        addProduct (state, action){
            state.items.push(action.payload)
        },
        deleteProduct (state, action){
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        updateProduct (state, action){
            const index = state.items.findIndex(item => item.id === action.payload.id)
            if(index !== -1){
                state.items[index] = action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'failed';
            });
    }
})

export const { addProduct, deleteProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;