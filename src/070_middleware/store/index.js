import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './modules/todo';

// Reduxストアを作成し、Providerのstore属性に渡すためexport
export default configureStore({
  reducer: { todoReducer },
});
