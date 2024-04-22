import { useDispatch } from 'react-redux';
import { toggleEditing, inputChange, deleteTodo } from '../store/modules/todo';
import { TODO_ENDPOINT } from '../consts/todoConsts';
import axios from 'axios';

const Todo = ({ todo, complete }) => {
  const dispatch = useDispatch();

  // ダブルクリック時、編集モードではなかったら編集モードに変更する関数
  // JSONのデータのeditingを反転させ、stateのtodoListのeditingも反転させる
  const handleDoubleClickToggleEdit = async (id) => {
    if (!todo.editing) {
      dispatch(toggleEditing({ id }));
      const toggleData = { ...todo, editing: !todo.editing };
      await axios.patch(TODO_ENDPOINT + '/' + id, toggleData);
    }
  };

  // フォーカスアウト時、または[Enter]押下時、editingを反転させる関数
  // 実行時にcontentが空文字だったら削除
  const handleToggleEdit = async (id) => {
    if (todo.content) {
      dispatch(toggleEditing({ id }));
      const toggleData = { ...todo, editing: !todo.editing };
      await axios.patch(TODO_ENDPOINT + '/' + id, toggleData);
    } else {
      dispatch(deleteTodo({ id }));
      await axios.delete(TODO_ENDPOINT + '/' + id);
    }
  };

  // Todo名を編集中、入力した値をcontentに更新する関数
  const handleInputChange = async (e, id) => {
    dispatch(inputChange({ inputVal: e.target.value, id }));
    const editingData = { ...todo, content: e.target.value };
    await axios.patch(TODO_ENDPOINT + '/' + id, editingData);
  };

  return (
    <div key={todo.id}>
      <button onClick={() => complete(todo.id)}>完了</button>
      <span onDoubleClick={() => handleDoubleClickToggleEdit(todo.id)}>
        {todo.editing ? (
          <input
            value={todo.content}
            onChange={(e) => handleInputChange(e, todo.id)}
            onBlur={() => handleToggleEdit(todo.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleToggleEdit(todo.id);
              }
            }}
            autoFocus={todo.editing}
          />
        ) : (
          <span>{todo.content}</span>
        )}
      </span>
    </div>
  );
};

export default Todo;
