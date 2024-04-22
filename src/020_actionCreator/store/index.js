import { createStore } from 'redux';
import { reducer } from './modules/counter';

export default createStore(reducer);
