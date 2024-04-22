const Input = ({ inputState, addTodoList }) => {
  // propsで受け取ったuseStateを分割代入
  const [inputVal, setInputVal] = inputState;

  // [Enter]を押下した場合も追加
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodoList();
    }
  };

  return (
    <>
      <input
        type='text'
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
      ></input>

      <button onClick={addTodoList}>追加</button>
    </>
  );
};

export default Input;
