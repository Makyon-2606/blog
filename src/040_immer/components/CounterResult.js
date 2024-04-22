import { useSelector } from 'react-redux';
const CounterResult = () => {
  const counterState = useSelector((state) => state.counter.count);

  return <h3>{counterState}</h3>;
};

export default CounterResult;
