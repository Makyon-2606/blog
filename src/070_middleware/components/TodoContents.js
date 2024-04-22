import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodoData, addTodo, deleteTodo } from '../store/modules/todo';
import { TODO_ENDPOINT } from '../consts/todoConsts';
import Todo from './Todo';
import Input from './Input';
import axios from 'axios';

const TodoContents = () => {
  const dispatch = useDispatch();

  // 入力値の状態管理
  const [inputVal, setInputVal] = useState('');

  // stateのtodoListを取得
  const todoList = useSelector((state) => state.todoReducer.todoList);

  // JSONからTodoListデータを取得
  useEffect(() => {
    dispatch(fetchTodoData());
  }, []);

  // todoListに新規追加を行う関数
  // JSONにデータを追加し、追加された最新データを受け取る
  // stateのtodoListにも新規追加し、入力フォーム値を削除
  const addTodoList = async () => {
    if (inputVal) {
      const newTodo = { content: inputVal, editing: false };
      const res = await axios.post(TODO_ENDPOINT, newTodo);
      dispatch(addTodo(res.data));
      setInputVal('');
    }
  };

  // todoListから削除を行う関数
  // JSONのデータから削除し、stateのtodoListからも削除
  const complete = async (id) => {
    dispatch(deleteTodo({ id }));
    await axios.delete(TODO_ENDPOINT + '/' + id);
  };

  return (
    <>
      <div style={styles.todoContainer}>
        {todoList.map((todo) => (
          <Todo todo={todo} complete={complete} key={todo.id} />
        ))}
        <Input inputState={[inputVal, setInputVal]} addTodoList={addTodoList} />
      </div>
    </>
  );
};

export default TodoContents;

const styles = {
  todoContainer: {
    margin: '0 300px',
    textAlign: 'left',
  },
};
