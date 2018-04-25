export default todos => {
	return todos.sort((a, b) => {
		return a.completed - b.completed;
	});
};
