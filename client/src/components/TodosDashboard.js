import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTodos } from '../actions/todo';
import TopBar from './TopBar';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

class TodosDashboard extends Component {
	componentDidMount() {
		this.fetchTodos();
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
