import { useDispatch } from 'react-redux';
import { add, minus } from '../store/modules/counter';

const CounterButton = ({ calcType, step }) => {
  const dispatch = useDispatch();
  const action = calcType === '+' ? add(step) : minus(step);

  const counterAction = () => {
    dispatch(action);
  };

  return (
    <>
      <button onClick={counterAction}>
        {calcType}
        {step}
      </button>
    </>
  );
};

export default CounterButton;
