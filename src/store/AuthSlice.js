import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fake API for authentication
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  const dummyUser = { email: "monika@gmail.com", password: "123456", token: "fake-token-123" };

  if (credentials.email === dummyUser.email && credentials.password === dummyUser.password) {
    localStorage.setItem("token", dummyUser.token);
    return { token: dummyUser.token };
  } else {
    return rejectWithValue("Invalid credentials! Please try again.");
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: localStorage.getItem('token') || null, error: null, isAuthenticated: false },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;  // Set to true after successful login
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;  // Ensure it's false if login fails
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
