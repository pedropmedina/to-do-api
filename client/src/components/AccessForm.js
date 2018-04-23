import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setTodos } from '../actions/todo';

const Form = styled.form`
	width: 40rem;
	padding: 3rem 4rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

	> input {
		display: block;
		width: 100%;
		margin-bottom: 2.5rem;
		height: 5rem;
		font-size: 1.6rem;
		text-indent: 1rem;
	}

	> div {
		display: flex;

		> button {
			flex: 1;
			margin: 0.5rem;
			border: none;
			font-size: 1.6rem;
			text-transform: uppercase;
			padding: 1.5rem;
			color: #ffffff;

			&:first-child {
				background-color: #3d69af;
			}

			&:last-child {
				background-color: #3caf85;
			}
		}
	}
`;

class AccessForm extends React.Component {
	state = {
		fields: {
			email: '',
			password: '',
		},
	};

	onChangeInput = e => {
		const name = e.target.name;
		const val = e.target.value;
		const fields = { ...this.state.fields };
		fields[name] = val;
		this.setState(() => ({ fields }));
	};

	onSignUp = e => {
		e.preventDefault();

		fetch('/users', {
			method: 'POST',
			body: JSON.stringify(this.state.fields),
			headers: {
				'content-type': 'application/json',
			},
		})
			.then(res => {
				return res.json();
			})
			.then(user => {
				console.log(user);
			})
			.catch(err => {
				console.log(err);
			});

		const fields = {
			email: '',
			password: '',
		};
		this.setState(() => ({ fields }));

		this.props.history.push('/todosDashboard');
	};

	onLogin = e => {
		e.preventDefault();

		fetch('/users/login', {
			method: 'POST',
			body: JSON.stringify(this.state.fields),
			headers: {
				'content-type': 'application/json',
			},
		})
			.then(res => {
				return res.headers.get('x-auth');
			})
			.then(token => {
				fetch('/todos', {
					method: 'GET',
					headers: new Headers({
						'x-auth': token,
					}),
				})
					.then(res => {
						return res.json();
					})
					.then(todos => {
						this.props.dispatch(setTodos(todos));
					})
					.catch(err => console.log(err));
			})
			.catch(err => {
				console.log(err);
			});

		const fields = {
			email: '',
			password: '',
		};
		this.setState(() => ({ fields }));

		this.props.history.push('/todosDashboard');
	};

	render() {
		return (
			<React.Fragment>
				<Form action="#">
					<input
						type="text"
						name="email"
						value={this.state.fields.email}
						placeholder="email"
						onChange={this.onChangeInput}
					/>
					<input
						type="password"
						name="password"
						value={this.state.fields.password}
						placeholder="password"
						onChange={this.onChangeInput}
					/>
					<div>
						<button onClick={this.onSignUp}>Sign up</button>
						<button onClick={this.onLogin}>Login</button>
					</div>
				</Form>
			</React.Fragment>
		);
	}
}

export default connect()(AccessForm);
