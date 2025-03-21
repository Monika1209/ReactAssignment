import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], filteredItems: [], status: 'idle', filters: { category: '', price: '' } },
  reducers: {
    filterByCategory: (state, action) => {
      state.filters.category = action.payload;
      state.filteredItems = action.payload
        ? state.items.filter(product => product.category === action.payload)
        : state.items;
    },
    filterByPrice: (state, action) => {
      state.filters.price = action.payload;
      if (action.payload === 'low') {
        state.filteredItems = [...state.items].sort((a, b) => a.price - b.price);
      } else if (action.payload === 'high') {
        state.filteredItems = [...state.items].sort((a, b) => b.price - a.price);
      } else {
        state.filteredItems = state.items;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { filterByCategory, filterByPrice } = productSlice.actions;
export default productSlice.reducer;
