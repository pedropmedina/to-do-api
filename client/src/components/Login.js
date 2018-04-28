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
		outline: none;
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

const ErrorMessage = styled.p`
	font-size: 1.2rem;
	background-color: #f28e8e;
	color: #ffffff;
	padding: 1.5rem;
	text-align: center;
	border-radius: 0.4rem 0.4rem 0 0;
	width: 100%;
	margin-bottom: -0.1rem;
	position: relative;

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

class Login extends React.Component {
	state = {
		fields: {
			email: '',
			password: '',
		},
		errFields: {},
	};

	componentDidMount() {
		this.props.handleIsAuth(this.props.location.pathname);
	}

	onChangeInput = e => {
		const name = e.target.name;
		const val = e.target.value;
		const fields = { ...this.state.fields };
		fields[name] = val;
		this.setState(() => ({ fields }));
	};

	validateFields = () => {
		const { email, password } = this.state.fields;
		const err = {};
		if (!email) {
			err['email'] = 'Email is required';
		}
		if (!password) {
			err['password'] = 'Password is required';
		}
		return err;
	};

	onLogin = e => {
		e.preventDefault();

		const errFields = this.validateFields();
		if (Object.keys(errFields).length) {
			return this.setState(() => ({ errFields }));
		}

		fetch('/users/login', {
			method: 'POST',
			body: JSON.stringify(this.state.fields),
			headers: {
				'content-type': 'application/json',
			},
		})
			.then(res => {
				if (!res.ok) {
					return Promise.reject();
				}
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
					{this.state.errFields.email && (
						<ErrorMessage>{this.state.errFields.email}</ErrorMessage>
					)}
					<input
						type="text"
						name="email"
						value={this.state.fields.email}
						placeholder="email"
						onChange={this.onChangeInput}
					/>

					{this.state.errFields.password && (
						<ErrorMessage>{this.state.errFields.password}</ErrorMessage>
					)}
					<input
						type="password"
						name="password"
						value={this.state.fields.password}
						placeholder="password"
						onChange={this.onChangeInput}
					/>

					<button>Login</button>

					<span>
						Need an account? <CustomLink to="/signUp">Sign up →</CustomLink>
					</span>
				</Form>
			</React.Fragment>
		);
	}
}

export default connect()(Login);
