import { combineReducers, createStore } from 'redux';

const initialState = 0;

// ステートの管理を行う
const reducer = (state = initialState, { type, step }) => {
  switch (type) {
    case '+':
      return state + step;
    case '-':
      return state - step;
    default:
      return state;
  }
};

// グローバルなステート
// ここにステートを操作するreducerを渡してあげる
export default createStore(reducer);
