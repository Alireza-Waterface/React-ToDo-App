import React, { useState } from 'react';

const EditTodoForm = (props) => {
	const [value, setValue] = useState(props.task.task);

	function handleSubmit (e) {
		e.preventDefault();

		props.editTodo(value, props.task.id);

		setValue('');
	}

	return (
		<form className='todo-form' onSubmit={ handleSubmit }>
			<input
				type="text"
				name="task"
				id="task"
				className='task-input-editing'
				placeholder='Update task'
				value={value}
				onChange={ (e) => setValue(e.target.value) }
				autoComplete='off'
			/>
			<button
				type='submit'
				className='confirm-btn'
			>
				Confirm
			</button>
		</form>
	);
}

export default EditTodoForm;