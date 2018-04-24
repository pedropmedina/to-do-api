const defaultTokenState = '';
export default (state = defaultTokenState, action) => {
	switch (action.type) {
		case 'ADD_TOKEN':
			return action.token;
		default:
			return state;
	}
};
