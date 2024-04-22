import { useDispatch } from 'react-redux';
import { add, minus } from '../store/modules/counter';

const CounterButton = ({ calcType, step }) => {
  const dispatch = useDispatch((state) => state.counterReducer);

  const clickHandler = () => {
    const actionObj = calcType === '+' ? add(step) : minus(step);
    dispatch(actionObj);
  };

  return (
    <button onClick={clickHandler}>
      {calcType}
      {step}
    </button>
  );
};
export default CounterButton;
