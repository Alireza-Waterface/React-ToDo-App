import React, { useState } from 'react';

const TodoForm = (props) => {
	const [value, setValue] = useState('');

	function handleSubmit (e) {
		e.preventDefault();

		props.addTodo(value);

		setValue('');
	}

	return (
		<form className='todo-form' onSubmit={ handleSubmit }>
			<input
				type="text"
				name="task"
				id="task"
				className='task-input'
				placeholder='Task title'
				value={value}
				onChange={ (e) => setValue(e.target.value) }
				autoComplete='off'
			/>
			<button
				type='submit'
				className='add-btn'
			>
				Add
			</button>
		</form>
	);
}

export default TodoForm;