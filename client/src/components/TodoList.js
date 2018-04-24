import React from 'react';
import { connect } from 'react-redux';

const TodoList = props => {
	console.log('This are the todos: ', props.todos);
	console.log('This are the tokens: ', props.token);
	return <div>hello there</div>;
};

const mapStateToProps = state => {
	return {
		todos: state.todos,
		token: state.token,
	};
};

export default connect(mapStateToProps)(TodoList);
