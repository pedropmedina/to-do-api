const removeAuthor = todos => {
	return todos.map(({ _id, text, completed, createdAt }) => {
		return { _id, text, completed, createdAt };
	});
};

module.exports = { removeAuthor };
