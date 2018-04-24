import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopBar from './TopBar';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

class TodosDashboard extends Component {
	render() {
		return (
			<div>
				<TopBar />
				<TodoForm />
				<TodoList />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		todos: state.todos,
	};
};

export default connect(mapStateToProps)(TodosDashboard);
