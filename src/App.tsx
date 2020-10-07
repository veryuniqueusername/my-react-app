import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import './App.css';
import './Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, NavbarItem } from './Navbar';
import { BsFillCalendarFill } from 'react-icons/bs';

export default function App() {
	return (
		<Router>
			<ThemeProvider>
				<Navbar>
					<Link to="/">
						<NavbarItem>Home</NavbarItem>
					</Link>
					<Link to="/calendar">
						<NavbarItem>
							<BsFillCalendarFill />
							Calendar
						</NavbarItem>
					</Link>
					<Link to="/">
						<NavbarItem>second home</NavbarItem>
					</Link>
				</Navbar>
				<Switch>
					<Route exact path="/">
						<Page />
					</Route>
					<Route path="/calendar">
						<PageDos />
					</Route>
				</Switch>
			</ThemeProvider>
		</Router>
	);
}

function Page() {
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
}

function PageDos() {
	const { theme, setTheme } = useTheme();
	setTheme(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
	return (
		<div>
			<h1 onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
				{theme}
			</h1>
			<a href="#!">Test number two</a>
		</div>
	);
}
