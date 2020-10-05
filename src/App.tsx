import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import './App.css';
import { BiPlusMedical } from 'react-icons/bi';
import { BsFillCalendarFill } from 'react-icons/bs';
import { Navbar, NavItem, DropdownMenu } from './Navbar';

export default function App() {
	return (
		<ThemeProvider>
			<Navbar>
				<NavItem icon={<BiPlusMedical />} />
				<NavItem icon={<BsFillCalendarFill />}>
					<DropdownMenu />
				</NavItem>
				<NavItem icon="😀">
					<DropdownMenu />
				</NavItem>
			</Navbar>
			<Page />
		</ThemeProvider>
	);
}

const Page = () => {
	const { theme, setTheme } = useTheme();
	setTheme(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
	return (
		<div>
			<h1 onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
				{theme}
			</h1>
			<a href="#!">Test</a>
		</div>
	);
};
