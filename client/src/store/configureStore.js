import { createStore, combineReducers } from 'redux';
import todoReducer from '../reducers/todo';
import tokenReducer from '../reducers/token';

export default () => {
	const store = createStore(
		combineReducers({
			todos: todoReducer,
			token: tokenReducer,
		}),
	);
	return store;
};
