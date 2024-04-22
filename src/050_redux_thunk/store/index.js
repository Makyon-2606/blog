import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counter.js';

export default configureStore({
  reducer: { counterReducer },
});
