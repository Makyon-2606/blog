import { useSelector } from 'react-redux';

const CounterResult = () => {
  const counterRedult = useSelector((state) => state.counterReducer);

  return <h3>{counterRedult}</h3>;
};

export default CounterResult;
