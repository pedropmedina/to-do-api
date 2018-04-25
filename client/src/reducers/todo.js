const todosReducerDefaultState = [];

export default (state = todosReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TODOS_STATE':
			return [...state, ...action.todos];
		case 'ADD_TODO':
			return [...state, action.todo];
		case 'EDIT_TODO':
			return state.map(todo => {
				if (todo._id === action.todo._id) {
					return { ...todo, ...action.todo };
				}
				return todo;
			});
		case 'DELETE_TODO':
			return state.filter(todo => {
				return todo._id !== action.id;
			});
		default:
			return state;
	}
};
