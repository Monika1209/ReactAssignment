import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "83e95b37b854e935373f67565687aea6";

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
  const data = await response.json();
  if (data.cod !== 200) throw new Error(data.message);
  return { city, data };
});

const initialState = {
  loading: false,
  error: null,
  cities: {},
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.cities[action.payload.city] = action.payload.data;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
