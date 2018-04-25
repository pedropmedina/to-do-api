import React from 'react';
import styled from 'styled-components';

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

	> div {
		margin-left: auto;

		> span {
			display: inline-block;
			padding: 1rem 2rem;
			background-color: #eee;
			height: 100%;
			cursor: pointer;

			&:first-child {
				border-right: 0.1rem solid #cccccc;
			}
		}
	}

	&:nth-of-type(odd) {
		background-color: #f7f7f7;
	}
`;

const Label = styled.label`
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
		background-color: ${props => (props.completed ? '#939393' : 'transparent')};
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	> input {
		visibility: hidden;
	}
`;

class Todo extends React.Component {
	state = {
		completed: false,
	};

	onToggleCompleted = () => {
		this.setState(() => ({ completed: !this.state.completed }));
	};

	render() {
		return (
			<Li>
				<Label completed={this.state.completed}>
					<input type="checkbox" onChange={this.onToggleCompleted} />
				</Label>
				{this.props.text}
				<div>
					<span>edit</span>
					<span>delete</span>
				</div>
			</Li>
		);
	}
}

export default Todo;
