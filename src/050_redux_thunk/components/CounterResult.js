import { useSelector } from 'react-redux';

const CounterResult = () => {
  const counterState = useSelector((state) => state.counterReducer.count);

  return <>{counterState}</>;
};

export default CounterResult;
