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

// EDIT_TODO
export const editTodo = ({
	_id = '',
	text = '',
	completed = false,
	createdAt = '',
} = {}) => ({
	type: 'EDIT_TODO',
	todo: { _id, text, completed, createdAt },
});

// DELETE_TODO
export const deleteTodo = id => ({
	type: 'DELETE_TODO',
	id,
});

// REMOVE_TODOS
export const removeTodos = () => ({
	type: 'REMOVE_TODOS',
});
