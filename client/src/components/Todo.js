import React from 'react';
import styled from 'styled-components';

const Li = styled.li`
	list-style: none;
	padding: 0.5rem;
	margin-bottom: 0.5rem;
	font-size: 1.2rem;
	letter-spacing: 0.1rem;
	display: flex;
	justify-content: space-between;

	> div {
		margin-left: auto;

		> span {
			display: inline-block;
			padding: 0.5rem 1rem;
			background-color: #eee;
			margin: 0 0.5rem;
		}
	}
`;

const Todo = props => {
	return (
		<Li>
			{props.text}
			<div>
				<span>edit</span>
				<span>delete</span>
			</div>
		</Li>
	);
};

export default Todo;
