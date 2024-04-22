import CounterButton from './CounterButton';
import CounterResult from './CounterResult';

const Counter = () => {
  return (
    <>
      <CounterResult />
      <CounterButton calcType='+' step={5} />
      <CounterButton calcType='-' step={5} />
    </>
  );
};

export default Counter;
