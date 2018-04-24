import React from 'react';
import styled from 'styled-components';
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

			&:first-child {
				background-color: #cc1e38;
			}

			&:last-child {
				background-color: #13c66a;
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

		&::placeholder {
			color: #aaaaaa;
			font-style: italic;
		}
	}

	> button {
		width: 100%;
		padding: 2rem;
		border: none;
		background-color: #eaeaea;
		border-radius: 0.4rem;
		font-size: 1.6rem;
		text-transform: uppercase;
		color: #ffffff;
		outline: none;
		box-shadow: 0 0.5rem 0.7rem rgba(0, 0, 0, 0.2);
		transition: all 0.2s;

		&:hover {
			transform: translateY(-0.1rem);
		}

		&:active {
			transform: translateY(0);
			box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.3);
		}
	}
`;

class TodoForm extends React.Component {
	state = {
		fields: {
			text: '',
			completed: false,
		},
	};

	onChangeInput = e => {
		const name = e.target.name;
		const val = e.target.value;
		const fields = { ...this.state.fields };
		fields[name] = val;
		this.setState(() => ({ fields }));
	};

	onSubmitForm = e => {
		e.preventDefault();

		fetch('/todos', {
			method: 'POST',
			body: JSON.stringify(this.state.fields),
			headers: new Headers({
				'x-auth': this.props.token,
				'content-type': 'application/json',
			}),
		})
			.then(res => {
				return res.json();
			})
			.then(todo => {
				this.props.dispatch(addTodo(todo));
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<React.Fragment>
				<Form action="#" onSubmit={this.onSubmitForm}>
					<input
						type="text"
						value={this.state.fields.text}
						name="text"
						placeholder="add todo"
						onChange={this.onChangeInput}
					/>
					<div>
						<label>
							uncompleted
							<input
								type="radio"
								name="completed"
								value="false"
								checked={this.state.fields.completed === false}
								onChange={this.onChangeInput}
							/>
						</label>

						<label>
							completed
							<input
								type="radio"
								name="completed"
								value="true"
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

const mapStateToProps = state => ({
	token: state.token,
});

export default connect(mapStateToProps)(TodoForm);
