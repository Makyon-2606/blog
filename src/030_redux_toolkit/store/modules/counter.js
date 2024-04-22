import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    add(state, actions) {
      return state + actions.payload;
    },
    minus(state, { payload }) {
      return state - payload;
    },
  },
});

const { add, minus } = counterSlice.actions;

export { add, minus };
export default counterSlice.reducer;
