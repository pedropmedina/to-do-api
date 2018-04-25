import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Todo from './Todo';
import sortCompleted from '../utils/sortCompleted';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const Ul = styled.ul`
	width: 70rem;
	padding: 2rem;
`;

const TodoList = props => {
	console.log('This are the todos: ', props.todos);

	return (
		<Wrapper>
			<Ul>
				{props.todos.map(todo => {
					return (
						<Todo
							key={todo._id}
							id={todo._id}
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
		todos: sortCompleted(state),
	};
};

export default connect(mapStateToProps)(TodoList);
