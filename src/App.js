import React from 'react';
import './App.css';
import TodoWrapper from './components/TodoWrapper';
import useLocalStorage from 'use-local-storage';

const App = () => {
	const [theme, setTheme] = useLocalStorage('theme' ? 'light' : 'dark' );

	const switchTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
	}
	
	return (
		<div className='app' data-theme={theme}>
			<main>
				<TodoWrapper switchTheme={switchTheme} />
			</main>
		</div>
	);
}

export default App;