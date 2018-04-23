// SET_TODOS_STATE
export const setTodos = todos => ({
	type: 'SET_TODOS_STATE',
	todos,
});

// ADD_TODO
export const addTodo = ({
	_id = '',
	text = '',
	completed = false,
	createdAt = '',
} = {}) => ({
	type: 'ADD_TODO',
	todo: { _id, text, completed, createdAt },
});