import React from 'react';
import TodoForm from './TodoForm';

class TodoEdit extends React.Component {
	componentDidMount() {
		this.props.handleIsAuth(this.props.location.pathname);
	}

	render() {
		return (
			<React.Fragment>
				<TodoForm
					text={this.props.location.state.text}
					completed={this.props.location.state.completed}
					editable={this.props.location.state.editable}
					id={this.props.location.state.id}
				/>
			</React.Fragment>
		);
	}
}

export default TodoEdit;
