import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { editTodo, deleteTodo } from '../actions/todo';
import { withRouter } from 'react-router-dom';

const Li = styled.li`
	list-style: none;
	padding-left: 0.5rem;
	margin-bottom: 0.7rem;
	font-size: 1.6rem;
	letter-spacing: 0.1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	color: #939393;
	${props =>
		props.completed &&
		css`
			opacity: 0.3;
			transform: scale(0.99);
		`};

	> label {
		margin: 0 1.5rem 0 0.5rem;
		position: relative;
		display: block;
		height: 2rem;
		width: 2rem;
		border: 0.2rem solid #939393;
		border-radius: 50%;

		&::after {
			content: '';
			display: block;
			width: 1rem;
			height: 1rem;
			background-color: ${props =>
				props.completed ? '#939393' : 'transparent'};
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		> input {
			visibility: hidden;
		}
	}

	> div {
		margin-left: auto;

		> button {
			border: none;
			display: inline-block;
			font-size: 1.6rem;
			color: #939393;
			letter-spacing: 0.1rem;
			padding: 1rem 2rem;
			background-color: #eee;
			height: 100%;
			cursor: ${props => (props.completed ? 'not-allowed' : 'pointer')};
			outline: none;

			&:first-child {
				border-right: 0.1rem solid #cccccc;
			}

			&:active {
				background-color: #ddd;
				color: #fff;
			}
		}
	}

	&:nth-of-type(odd) {
		background-color: #f7f7f7;
	}
`;

class Todo extends React.Component {
	state = {
		completed: this.props.completed || false,
	};

	onToggleCompleted = () => {
		const completed = !this.state.completed;
		this.setState(() => ({ completed }));

		fetch(`/todos/${this.props.id}`, {
			method: 'PATCH',
			headers: new Headers({
				'x-auth': localStorage.getItem('token'),
				'content-type': 'application/json',
			}),
			body: JSON.stringify({
				text: this.props.text,
				completed: completed,
				createdAt: this.props.createdAt,
			}),
		})
			.then(res => {
				return res.json();
			})
			.then(todo => {
				this.props.dispatch(editTodo(todo));
				console.log(todo);
			})
			.catch(err => {
				console.log(err);
			});
	};

	onDeleteTodo = () => {
		fetch(`/todos/${this.props.id}`, {
			method: 'DELETE',
			headers: new Headers({
				'content-type': 'application/json',
				'x-auth': localStorage.getItem('token'),
			}),
		})
			.then(res => res.json())
			.then(todo => {
				this.props.dispatch(deleteTodo(todo._id));
			})
			.catch(err => console.log(err));
	};

	onEditTodo = () => {
		return this.props.history.push({
			pathname: `/editTodo/${this.props.id}`,
			state: {
				text: this.props.text,
				completed: this.props.completed,
				editable: true,
				id: this.props.id,
			},
		});
	};

	render() {
		return (
			<Li completed={this.state.completed}>
				<label>
					<input type="checkbox" onChange={this.onToggleCompleted} />
				</label>
				{this.props.text}
				<div>
					<button disabled={this.state.completed} onClick={this.onEditTodo}>
						edit
					</button>
					<button disabled={this.state.completed} onClick={this.onDeleteTodo}>
						delete
					</button>
				</div>
			</Li>
		);
	}
}

const TodoWithRouter = withRouter(Todo);
export default connect()(TodoWithRouter);
