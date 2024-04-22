import Counter from './components/Counter';
import { Provider } from 'react-redux';
import createStore from './store';

const Example = () => {
  return (
    <Provider store={createStore}>
      <Counter />
    </Provider>
  );
};

export default Example;
