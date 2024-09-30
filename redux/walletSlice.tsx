import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  existed: false,
  unlocked: false,
  connected: false,
  tokens: []
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    changeExistStatus(state, action) {
      state.existed = action.payload.existed;
      if (action.payload.existed === false) {
        state.unlocked = false;
        state.connected = false;
      }
    },
    changeUnlockStatus(state, action) {
      state.unlocked = action.payload.unlocked;
      if (action.payload.unlocked === false) state.connected = false;
    },
    changeConnectStatus(state, action) {
      state.connected = action.payload.connected;
    },
    changeTokensList(state, action) {
      state.tokens = action.payload.tokens;
    }
  }
});

export const {
  changeExistStatus,
  changeUnlockStatus,
  changeConnectStatus,
  changeTokensList
} = walletSlice.actions;
export default walletSlice.reducer;
