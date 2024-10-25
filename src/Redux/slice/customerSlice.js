import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define API Base URL
const API_BASE_URL = 'http://197.251.217.45:5000';

// Async Thunk for fetching customer data
export const fetchCustomer = createAsyncThunk(
  'customer/fetchCustomer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Users/Customer-Get`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  customers: [],
  status: 'idle',
  error: null,
};

// Customer Slice
const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Customer
      .addCase(fetchCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
