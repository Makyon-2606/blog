import { addAsyncWithStatus } from '../store/modules/counter';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const { count, status } = useSelector((state) => state.counter);

  const isLoading = status === 'Loading...';

  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(addAsyncWithStatus(3));
  };

  return (
    <>
      {status}
      <h3>{count}</h3>
      <button onClick={clickHandler} disabled={isLoading}>
        非同期
      </button>
    </>
  );
};
export default Counter;
