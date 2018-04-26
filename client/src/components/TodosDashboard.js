import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTodos, removeTodos } from '../actions/todo';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

class TodosDashboard extends Component {
	componentDidMount() {
		this.props.handleIsAuth(this.props.location.pathname);
		this.fetchTodos();
	}

	componentWillUnmount() {
		this.props.dispatch(removeTodos());
	}

	fetchTodos = () => {
		fetch('/todos', {
			method: 'GET',
			headers: new Headers({
				'x-auth': localStorage.getItem('token'),
			}),
		})
			.then(res => {
				return res.json();
			})
			.then(todos => {
				this.props.dispatch(setTodos(todos));
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div>
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
