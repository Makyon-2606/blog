import { Provider } from 'react-redux';
// storeのindexからexportされたconfigureをimport
import store from './store/index';
import TodoContents from './components/TodoContents';

const Example = () => {
  return (
    <>
      <Provider store={store}>
        <TodoContents />
      </Provider>
    </>
  );
};

export default Example;
