import React from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';

const Wrapper = styled.div`
	height: 6rem;
	padding: 1rem;
	position: relative;
	background-color: #eee;

	> span {
		position: absolute;
		right: 6rem;
		top: 50%;
		transform: translateY(-50%);
		display: inline-block;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		background-color: #fefefe;
	}

	> div {
		width: 12rem;
		padding: 2rem;
		position: absolute;
		bottom: 0;
		right: 6rem;
		transform: translateX(4rem);
		background-color: #cecece;
		text-align: center;
		border-radius: 0.4rem;
		color: #fefefe;
		font-size: 1.2rem;
		visibility: hidden;

		${props =>
			props.showOptions &&
			css`
				bottom: -100%;
				visibility: visible;
			`};
	}
`;

class TopBar extends React.Component {
	state = {
		showOptions: false,
	};

	onLogOut = () => {
		fetch('/users/me/token', {
			method: 'DELETE',
			headers: new Headers({
				'x-auth': localStorage.getItem('token'),
			}),
		})
			.then(() => {
				this.props.history.push('/');
				this.setState(() => ({
					showOptions: !this.state.showOptions,
				}));
				console.log('successfully logged out');
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<Wrapper showOptions={this.state.showOptions}>
				<span
					onClick={() =>
						this.setState(() => ({
							showOptions: !this.state.showOptions,
						}))
					}
				/>
				<div onClick={this.onLogOut}>Log out</div>
			</Wrapper>
		);
	}
}

const TopBarWithRouter = withRouter(TopBar);
export default TopBarWithRouter;
