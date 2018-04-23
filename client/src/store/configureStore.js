import { createStore } from 'redux';
import todoReducer from '../reducers/todo';

export default () => {
	const store = createStore(todoReducer);
	return store;
};
