const todosReducerDefaultState = [];

export default (state = todosReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TODOS_STATE':
			return [...state, ...action.todos];
		case 'ADD_TODO':
			return [...state, action.todo];
		default:
			return state;
	}
};
