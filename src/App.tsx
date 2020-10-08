import React from 'react';
import { BsCalendar, BsInfoSquare, BsTable } from 'react-icons/bs';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import './App.css';
import { Navbar, NavbarItem } from './Navbar';
import Calendar from './Calendar';
import Schedule from './Schedule';
import Info from './Info';

export default function App() {
	return (
		<Router>
			<h1>test</h1>
			<ThemeProvider>
				<Navbar>
					<Link to="/schedule">
						<NavbarItem>
							<BsTable className="Icon" />
							Schema
						</NavbarItem>
					</Link>
					<Link to="/calendar">
						<NavbarItem>
							<BsCalendar className="Icon" />
							Kalender
						</NavbarItem>
					</Link>
					<Link to="/info">
						<NavbarItem>
							<BsInfoSquare className="Icon" />
							Info
						</NavbarItem>
					</Link>
				</Navbar>
				<Switch>
					<Route path="/calendar">
						<Calendar />
					</Route>
					<Route path="/schedule">
						<Schedule />
					</Route>
					<Route path="/info">
						<Info />
					</Route>
				</Switch>
			</ThemeProvider>
		</Router>
	);
}
