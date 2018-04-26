import React from 'react';
import styled from 'styled-components';
import UserIcon from './UserIcon';

const Wrapper = styled.div`
	height: 7rem;
	padding: 1rem;
	position: relative;
	background-color: #eee;
`;

const TopBar = () => {
	return (
		<Wrapper>
			<UserIcon />
		</Wrapper>
	);
};

export default TopBar;
