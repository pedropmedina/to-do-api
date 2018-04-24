import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Todo from './Todo';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const Ul = styled.ul`
	width: 50rem;
	padding: 2rem;
`;

const TodoList = props => {
	console.log('This are the todos: ', props.todos);
	console.log('This are the tokens: ', props.token);
	return (
		<Wrapper>
			<Ul>
				{props.todos.map(todo => {
					return (
						<Todo
							key={todo._id}
							text={todo.text}
							completed={todo.completed}
							createdAt={todo.createdAt}
						/>
					);
				})}
			</Ul>
		</Wrapper>
	);
};

const mapStateToProps = state => {
	return {
		todos: state.todos,
		token: state.token,
	};
};

export default connect(mapStateToProps)(TodoList);