import React from 'react';
import { BsToggleOn } from 'react-icons/bs';
import { useTheme } from './ThemeContext';

export function Navbar(props) {
	return (
		<div className="Navbar">
			<ul className="NavbarList">{props.children}</ul>
			<ThemeSwitch />
		</div>
	);
}

export function NavbarItem(props) {
	return <li className="NavbarItem">{props.children}</li>;
}

function ThemeSwitch() {
	const { theme, setTheme } = useTheme();
	setTheme(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
	return (
		<div>
			<BsToggleOn
				className={theme}
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			/>
		</div>
	);
}
