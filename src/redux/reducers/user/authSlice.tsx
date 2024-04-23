import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
};

const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
