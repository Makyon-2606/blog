import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TODO_ENDPOINT } from '../../consts/todoConsts';
import axios from 'axios';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todoList: [],
    status: null,
  },
  reducers: {
    addTodo(state, { payload }) {
      // 渡ってきたデータをstateに追加
      state.todoList.push(payload);
    },

    deleteTodo(state, { payload }) {
      // 渡ってきたid以外のデータを残してstateを更新
      const newTodo = state.todoList.filter((todo) => {
        return todo.id !== payload.id;
      });
      state.todoList = newTodo;
    },

    toggleEditing(state, { payload }) {
      // 渡ってきたidと合致するデータのみeditingを反転させてstateを更新
      const newState = state.todoList.map((todo) => {
        return todo.id === payload.id
          ? { ...todo, editing: !todo.editing }
          : todo;
      });
      state.todoList = newState;
    },

    inputChange(state, { payload }) {
      // 渡ってきたidと合致するデータのcontentに、渡ってきた入力値(payload.inputVal)を代入
      const newState = state.todoList.map((todo) => {
        return todo.id === payload.id
          ? { ...todo, content: payload.inputVal }
          : todo;
      });
      state.todoList = newState;
    },
  },

  // 非同期型のアクションクリエーターがdispatchされたら処理を行う
  extraReducers: (builder) => {
    builder.addCase(fetchTodoData.pending, () => {});
    builder.addCase(fetchTodoData.fulfilled, (state, actions) => {
      console.log(actions);
      state.todoList = actions.payload;
    });
    builder.addCase(fetchTodoData.rejected, () => {});
  },
});

// createAsyncThunkで非同期型のアクションを生成
// 第二引数はディスパッチされた際の非同期処理を記載。完了したらfulfilledへ
// データを取得時にこのアクションがディスパッチされる必要があるためexport
export const fetchTodoData = createAsyncThunk('todo/asyncTodo', async () => {
  const res = await axios.get(TODO_ENDPOINT);
  return res.data;
});

export const { addTodo, deleteTodo, toggleEditing, inputChange } =
  todoSlice.actions;

// configureのreducerプロパティに渡すためexport
export default todoSlice.reducer;
