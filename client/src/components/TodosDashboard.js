import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TopBar from './TopBar';

class TodosDashboard extends Component {
	render() {
		console.log(this.props.todos);
		return (
			<div>
				<TopBar />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		todos: state,
	};
};

export default connect(mapStateToProps)(TodosDashboard);
