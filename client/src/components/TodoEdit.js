import React from 'react';
import TodoForm from './TodoForm';

const TodoEdit = props => {
	return (
		<React.Fragment>
			<TodoForm
				text={props.location.state.text}
				completed={props.location.state.completed}
				editable={props.location.state.editable}
				id={props.location.state.id}
			/>
		</React.Fragment>
	);
};

export default TodoEdit;
