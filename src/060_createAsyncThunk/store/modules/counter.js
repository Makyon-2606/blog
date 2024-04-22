import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { asyncCount } from '../../api/counter';

const counter = createSlice({
  name: 'counter',
  initialState: { count: 0, status: '' },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addAsyncWithStatus.pending, (state) => {
        state.status = 'Loading...';
      })
      .addCase(addAsyncWithStatus.fulfilled, (state, actions) => {
        state.status = '取得済';
        state.count += actions.payload;
      })
      .addCase(addAsyncWithStatus.rejected, (state) => {
        state.status = 'エラー';
      });
  },
});

const addAsyncWithStatus = createAsyncThunk(
  'counter/asyncCount',
  async (payload) => {
    const res = await asyncCount(payload);
    return res.data;
  }
);

export { addAsyncWithStatus };
export default counter.reducer;
