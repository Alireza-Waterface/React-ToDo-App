import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare, faTrash, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';


const Todo = (props) => {
	const [showNotes, setShowNotes] = useState(false);
	const [editedNotes, setEditedNotes] = useState(props.task.notes);
	const [isEditingDescription, setIsEditingDescription] = useState(false);

	const handlePriorityChange = (e) => {
		const newPriority = e.target.value;
		props.onPriorityChange(props.task.id, newPriority);
	};

	const handleNotesChange = (e) => {
		setEditedNotes(e.target.value);
	};

	const handleSaveNotes = () => {
		props.onNotesChange(props.task.id, editedNotes);
		setIsEditingDescription(!isEditingDescription);
		setShowNotes(false);
	};

	const toggleEditNotes = () => {
		setEditedNotes(props.task.notes);
		setShowNotes(!showNotes);
		setIsEditingDescription(!isEditingDescription);
	};

	return (
		<div className='todo'>
			<div className="todo-content">
				<p
					className={props.task.completed ? 'task-title completed' : 'task-title'}
					onClick={() => props.toggleComplete(props.task.id)}
				>
					{props.task.task}
				</p>

				<div className='icons'>
					<select value={props.task.priority} onChange={handlePriorityChange} className='task-priority-options'>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>

					<FontAwesomeIcon
						className='edit-icon'
						icon={faPenToSquare}
						onClick={() => props.editTodo(props.task.id)}
						title='Edit task title'
					/>

					<FontAwesomeIcon
						className='delete-icon'
						icon={faTrash}
						onClick={() => props.deleteTodo(props.task.id)}
						title='Delete task'
					/>

					<button className='notes-toggle-btn' onClick={toggleEditNotes}>
						{showNotes ?
							<FontAwesomeIcon
								title='Hide description'
								icon={faAngleUp}
							/>
							:
							<FontAwesomeIcon
								title='Show desciption'
								icon={faAngleDown}
							/>
						}
					</button>
				</div>
			</div>

			{showNotes && (
				<div className='todo-notes'>
					{isEditingDescription ? (
						<>
							<textarea
								className='notes-textarea'
								value={editedNotes}
								onChange={handleNotesChange}
								placeholder='Notes for task'
							/>
							<button className='save-notes-btn' onClick={handleSaveNotes}>
								Save note
							</button>
						</>
					) : (
						<p>{props.task.notes}</p>
					)}
				</div>
			)}
		</div>
	)
}

export default Todo;