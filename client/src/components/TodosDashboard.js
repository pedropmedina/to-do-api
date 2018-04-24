import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TopBar from './TopBar';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

class TodosDashboard extends Component {
	render() {
		console.log(this.props.todos);
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
