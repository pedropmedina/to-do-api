import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

	> button {
		width: 100%;
		margin: 0.5rem;
		border: none;
		font-size: 1.6rem;
		text-transform: uppercase;
		padding: 1.5rem;
		color: #ffffff;
		background-color: #3caf85;
	}

	> span {
		display: inline-block;
		padding: 1rem;
		margin-top: 1rem;
		font-size: 1.2rem;
		color: #aaaaaa;
	}
`;

const CustomLink = styled(Link)`
	text-decoration: none;
	color: #3d69af;
`;

class Login extends React.Component {
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
				localStorage.setItem('token', token);
				this.props.history.push('/todosDashboard');
			})
			.catch(err => {
				console.log(err);
			});

		const fields = {
			email: '',
			password: '',
		};
		this.setState(() => ({ fields }));
	};

	render() {
		return (
			<React.Fragment>
				<Form action="#" onSubmit={this.onLogin}>
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
					<button>Login</button>

					<span>
						Need an account? <CustomLink to="/">Sign up →</CustomLink>
					</span>
				</Form>
			</React.Fragment>
		);
	}
}

export default connect()(Login);
