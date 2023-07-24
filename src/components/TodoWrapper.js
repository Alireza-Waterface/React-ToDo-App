import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import TodoForm from './TodoForm';
import Todo from './Todo';
import EditTodoForm from './EditTodoForm';

const TodoWrapper = (props) => {
	const [todos, setTodos] = useState ([]);
	const [sortOption, setSortOption] = useState('medium');
	const [filterOption, setFilterOption] = useState('all');

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem('todos'));
		if (storedTodos) {
			const updatedTodos = storedTodos.map (
				todo => ({ ...todo, priority: todo.priority || 'medium', notes: todo.notes || '' })
			);
      		setTodos(updatedTodos);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const addTodo = (todo) => {
		if (todo !== '') {
			setTodos ([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false, priority: 'medium', notes: '' }]);
		}
	}

	const toggleComplete = (id) => {
		setTodos (todos.map (
			todo => todo.id === id ? {...todo, completed: !todo.completed} : todo
		));
	}

	const deleteTodo = (id) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
    	setTodos(updatedTodos);
	}

	const editTodo = (id) => {
		setTodos(todos.map (todo =>
			todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo		
		));
	}

	const editTask = (task, id) => {
		if (task !== '') {
			setTodos(todos.map (
				todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo
			));
		}
	}

	const handlePriorityChange = (id, priority) => {
		const updatedTodos = todos.map ((todo) =>
			todo.id === id ? { ...todo, priority: priority } : todo
		);
		setTodos(updatedTodos);
	};

	const sortedTodos = () => {
		let sorted = [...todos];
	
		switch (sortOption) {
			case 'priorityHighToLow':
				sorted = sorted.sort((a, b) => {
					if (a.priority === 'high' && b.priority !== 'high') return -1;
					if (a.priority !== 'high' && b.priority === 'high') return 1;
					return 0;
				}).sort((a, b) => {
					if (a.priority === 'medium' && b.priority === 'low') return -1;
					if (a.priority === 'low' && b.priority === 'medium') return 1;
					return 0;
				});
			break;

			case 'priorityLowToHigh':
				sorted = sorted.sort((a, b) => {
					if (a.priority === 'low' && b.priority !== 'low') return -1;
					if (a.priority !== 'low' && b.priority === 'low') return 1;
					return 0;
				}).sort((a, b) => {
					if (a.priority === 'medium' && b.priority === 'high') return -1;
					if (a.priority === 'high' && b.priority === 'medium') return 1;
					return 0;
				});
			break;
		}
	
		switch (filterOption) {
			case 'completed':
				return sorted.filter(todo => todo.completed);
			case 'incomplete':
				return sorted.filter(todo => !todo.completed);
			default:
				return sorted;
		}
	};

	const handleNotesChange = (id, notes) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, notes } : todo
		);
		setTodos(updatedTodos);
	};

	return (
		<div className='wrapper'>
			<div className='title_switch'>
				<h1 className='title'>To-Do List</h1>

				<div className='dark-mode-switch'>
					<FontAwesomeIcon icon={faMoon} className='switch-icons' />
					<label className='switch'>
					<input type='checkbox' />
					<span className='slider round' onClick={props.switchTheme}></span>
					</label>
					<FontAwesomeIcon icon={faSun} className='switch-icons' />
				</div>
			</div>

			<TodoForm addTodo={addTodo} />

			<div className='filters'>
				<div className='d-flex align-center'>
					<p className="priority-selector-title">Filter: </p>
					<select value={filterOption} onChange={(e) => setFilterOption(e.target.value)} className='filter-options'>
						<option value="all">All Tasks</option>
						<option value="completed">Completed</option>
						<option value="incomplete">Incomplete</option>
					</select>
				</div>
				<div className='d-flex align-center'>
					<p className="sort-selector-title">Sort: </p>
					<select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className='sort-options'>
						<option value="medium">Default Order</option>
						<option value="priorityHighToLow">High to Low</option>
						<option value="priorityLowToHigh">Low to High</option>
					</select>
				</div>
			</div>
	
			{ sortedTodos().map((todo, index) => (
				todo.isEditing ? (
					<EditTodoForm
						editTodo={editTask}
						task={todo}
					/>
				) : (
					<Todo
						task={todo}
						key={index}
						toggleComplete={toggleComplete}
						deleteTodo={deleteTodo}
						editTodo={editTodo}
						onPriorityChange={handlePriorityChange}
						onNotesChange={handleNotesChange}
					/>
				)
			)) }
		</div>
	);
}

export default TodoWrapper;