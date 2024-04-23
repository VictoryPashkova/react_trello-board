import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  mainModal: true,
  welcomeModal: true,
  cardModal: false,
};

type Modals = {
  mainModal?: boolean;
  welcomeModal?: boolean;
  cardModal?: boolean;
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModals: (state, action: PayloadAction<Modals>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setModals } = modalSlice.actions;

export default modalSlice.reducer;
