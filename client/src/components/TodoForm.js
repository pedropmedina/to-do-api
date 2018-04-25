import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { addTodo } from '../actions/todo';

const Form = styled.form`
	width: 70rem;
	margin: 4rem auto;
	padding: 5rem;
	box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);

	> *:not(:last-child) {
		margin-bottom: 2rem;
	}

	> div {
		display: flex;

		> label {
			flex: 1;
			padding: 2rem;
			color: #ffffff;
			font-size: 1.6rem;
			text-transform: uppercase;
			text-align: center;
			position: relative;
			user-select: none;
			cursor: pointer;

			&::after {
				content: '\\2713';
				position: absolute;
				right: -25%;
				top: 0;
				display: inline-block;
				height: 100%;
				width: 25%;
				font-size: 2rem;
				background-color: #aeaeae;
				color: #fefefe;
				padding: 1rem;
				line-height: 2.2;
				visibility: hidden;
			}

			&:first-child {
				background-color: #cc1e38;
				${props =>
					!props.completed &&
					css`
						background-color: #962536;
						color: #c1c1c1;
						transform: scaleY(0.998);
					`};

				&::after {
					${props =>
						!props.completed &&
						css`
							background-color: #f99957;
							color: #fefefe;
							right: 0;
							visibility: visible;
						`};
				}
			}

			&:last-child {
				background-color: #13c66a;
				${props =>
					props.completed &&
					css`
						background-color: #1a8950;
						color: #c1c1c1;
						transform: scaleY(0.998);
					`};

				&::after {
					${props =>
						props.completed &&
						css`
							background-color: #f99957;
							color: #fefefe;
							right: 0;
							visibility: visible;
						`};
				}
			}

			> input {
				display: none;
			}
		}
	}

	> input {
		width: 100%;
		height: 5rem;
		text-indent: 1.5rem;
		font-size: 1.6rem;
		border: none;
		background-color: #f9f9f9;
		border-bottom: 0.5rem solid #eaeaea;
		outline: none;

		&::placeholder {
			color: #cecece;
			font-style: italic;
		}
	}

	> button {
		width: 100%;
		padding: 2rem;
		border: none;
		background-color: #cccccc;
		border-radius: 0.4rem;
		font-size: 1.6rem;
		text-transform: uppercase;
		color: #ffffff;
		outline: none;
		box-shadow: 0 0.5rem 1.3rem rgba(0, 0, 0, 0.2);
		transition: all 0.2s;
		user-select: none;
		cursor: pointer;

		&:hover {
			transform: translateY(-0.1rem);
		}

		&:active {
			transform: translateY(0);
			box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.3);
		}
	}
`;

const P = styled.p`
	font-size: 1.2rem;
	background-color: #f28e8e;
	color: #ffffff;
	padding: 1.5rem;
	text-align: center;
	border-radius: 0.4rem;
	width: 30rem;
	margin: 0 auto -5rem auto;
	position: relative;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);

	&::after {
		content: '';
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border: 2rem solid transparent;
		border-top-color: #f28e8e;
		border-bottom: 0;
		margin-bottom: -2.2rem;
	}
`;

class TodoForm extends React.Component {
	state = {
		fields: {
			text: '',
			completed: false,
		},
		errFields: {},
	};

	onChangeInput = e => {
		const name = e.target.name;
		let val = e.target.value;

		// convert string to boolen for completed
		if (val === 'true') {
			val = true;
		} else if (val === 'false') {
			val = false;
		}

		const fields = { ...this.state.fields };
		fields[name] = val;
		this.setState(() => ({ fields }));
	};

	validateForm = () => {
		const err = {};
		const fields = { ...this.state.fields };
		if (!fields.text) {
			err['text'] = 'Add todo before sending form.';
		}
		return err;
	};

	onSubmitForm = e => {
		e.preventDefault();

		// check text field is not empty
		const errFields = this.validateForm();
		this.setState(() => ({ errFields }));
		if (Object.keys(errFields).length) return;

		fetch('/todos', {
			method: 'POST',
			body: JSON.stringify(this.state.fields),
			headers: new Headers({
				'x-auth': localStorage.getItem('token'),
				'content-type': 'application/json',
			}),
		})
			.then(res => {
				return res.json();
			})
			.then(todo => {
				this.props.dispatch(addTodo(todo));
				const fields = { text: '', completed: false };
				this.setState(() => ({ fields }));
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<React.Fragment>
				<Form
					action="#"
					onSubmit={this.onSubmitForm}
					completed={this.state.fields.completed}
				>
					{this.state.errFields.text && <P>{this.state.errFields.text}</P>}
					<input
						type="text"
						value={this.state.fields.text}
						name="text"
						placeholder="Add todo here (e.g., wash clothes)."
						onChange={this.onChangeInput}
					/>
					<div>
						<label>
							uncompleted
							<input
								type="radio"
								name="completed"
								defaultValue="false"
								checked={this.state.fields.completed === false}
								onChange={this.onChangeInput}
							/>
						</label>

						<label>
							completed
							<input
								type="radio"
								name="completed"
								defaultValue="true"
								checked={this.state.fields.completed === true}
								onChange={this.onChangeInput}
							/>
						</label>
					</div>
					<button>Add todo</button>
				</Form>
			</React.Fragment>
		);
	}
}

export default connect()(TodoForm);
