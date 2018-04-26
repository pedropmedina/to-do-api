import React from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import userIcon from '../assets/icons/user.png';
import onClickOutside from 'react-onclickoutside';

const Wrapper = styled.div`
	position: absolute;
	right: 6rem;
	top: 50%;
	transform: translateY(-50%);

	> span {
		display: inline-block;
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		border: .3rem solid #fff;
		background-color: #d3d3d3;
		background-image: url("${userIcon}");
		background-repeat: no-repeat;
		background-size: 110%;
		background-position: center;
	}

	> div {
		width: 12rem;
		padding: 2rem;
		position: absolute;
		bottom: 0;
		left: -6rem;
		transform: translateX(2rem);
		background-color: #cecece;
		text-align: center;
		border-radius: 0.4rem;
		color: #fefefe;
		font-size: 1.2rem;
		visibility: hidden;

		${props =>
			props.showOptions &&
			css`
				bottom: -110%;
				visibility: visible;
			`};
	}
`;

class UserIcon extends React.Component {
	state = {
		showOptions: false,
	};

	onShowOptions = () => {
		this.setState(() => ({
			showOptions: !this.state.showOptions,
		}));
	};

	handleClickOutside = () => {
		if (!this.state.showOptions) {
			this.setState(() => ({
				showOptions: false,
			}));
		} else {
			this.setState(() => ({
				showOptions: !this.state.showOptions,
			}));
		}
	};

	onLogOut = () => {
		fetch('/users/me/token', {
			method: 'DELETE',
			headers: new Headers({
				'x-auth': localStorage.getItem('token'),
			}),
		})
			.then(() => {
				this.setState(() => ({
					showOptions: !this.state.showOptions,
				}));
				this.props.history.push('/');
				console.log('successfully logged out');
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<Wrapper showOptions={this.state.showOptions}>
				<span onClick={this.onShowOptions} />
				<div onClick={this.onLogOut}>Log out</div>
			</Wrapper>
		);
	}
}

const UserIconWithRouter = withRouter(onClickOutside(UserIcon));
export default UserIconWithRouter;
