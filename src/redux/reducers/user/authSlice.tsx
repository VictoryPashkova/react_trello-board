import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  userName: string;
};

const initialState: UserState = {
  userName: '',
};

const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userName = action.payload.userName;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
