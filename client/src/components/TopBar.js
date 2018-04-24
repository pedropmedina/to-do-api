import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 6rem;
	padding: 1rem;
	position: relative;
	background-color: #eee;

	> span {
		position: absolute;
		right: 4rem;
		top: 50%;
		transform: translateY(-50%);
		display: inline-block;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		background-color: #fefefe;
	}
`;

const TopBar = () => {
	return (
		<Wrapper>
			<span />
		</Wrapper>
	);
};

export default TopBar;
