import React from 'react';
import { BsCalendar, BsTable } from 'react-icons/bs';
import { BiFoodMenu } from 'react-icons/bi';
import { CgNotes } from 'react-icons/cg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import './App.css';
import { Navbar, NavbarItem, Food } from './Navbar';
import Calendar from './Calendar';
import Schedule from './Schedule';
import Food from './FoodSchedule';
import Notes from './Notes';

export default function App() {
	return (
		<Router>
			<ThemeProvider>
				<Navbar>
					<Food />
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
					<Link to="/food">
						<NavbarItem>
							<BiFoodMenu className="Icon" />
							Mat
						</NavbarItem>
					</Link>
					<Link to="/notes">
						<NavbarItem>
							<CgNotes className="Icon" />
							Anteckningartre
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
					<Route path="/food">
						<Food />
					</Route>
					<Route path="/notes">
						<Notes />
					</Route>
				</Switch>
			</ThemeProvider>
		</Router>
	);
}
