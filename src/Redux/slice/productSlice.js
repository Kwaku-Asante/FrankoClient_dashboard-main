// src/Redux/slice/productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the API base URL
const API_URL = 'http://197.251.217.45:5000';

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${API_URL}/Product/Product-Get`);
  return response.data; // Assuming the response data contains the product list
});

// Async thunk for fetching products by brand
export const fetchProductsByBrand = createAsyncThunk('products/fetchProductsByBrand', async (brandCode) => {
  const response = await axios.get(`${API_URL}/Product-Get-by-Brand/${brandCode}`);
  return response.data; // Assuming the response data contains the filtered product list
});

// Async thunk for fetching products by showroom
export const fetchProductsByShowroom = createAsyncThunk('products/fetchProductsByShowroom', async (showroomCode) => {
  const response = await axios.get(`${API_URL}/Product-Get-by-ShowRoom/${showroomCode}`);
  return response.data; // Assuming the response data contains the filtered product list
});

// Async thunk for adding a new product
export const addProduct = createAsyncThunk('products/addProduct', async (productData) => {
  const response = await axios.post(`${API_URL}/Product/Product-Post`, productData);
  return response.data; // Assuming the response returns the added product
});

// Async thunk for updating a product
export const updateProduct = createAsyncThunk('products/updateProduct', async (productData) => {
  const response = await axios.put(`${API_URL}/Product/Product_Put`, productData);
  return response.data; // Assuming the response returns the updated product
});

// Create the product slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsByBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsByShowroom.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByShowroom.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByShowroom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); // Add the new product to the state
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload; // Update the product in the state
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the action to clear products
export const { clearProducts } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
