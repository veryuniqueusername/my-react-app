import './App.css';
import { CSSTransition } from 'react-transition-group';
import React, { useState } from 'react';
import { BiPlusMedical } from 'react-icons/bi';

export function DropdownMenu() {
	const [activeMenu, setActiveMenu] = useState('main');
	const [menuHeight, setMenuHeight] = useState('auto');

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}

	function DropdownItem(props) {
		return (
			<a
				href="#!"
				className="MenuItem"
				onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
			>
				<span className="IconButton">{props.leftIcon}</span>

				{props.children}

				<span className="IconRight">{props.rightIcon}</span>
			</a>
		);
	}
	return (
		<div className="Dropdown" style={{ height: menuHeight }}>
			<CSSTransition
				in={activeMenu === 'main'}
				unmountOnExit
				timeout={500}
				classNames="MenuPrimary"
				onEnter={calcHeight}
			>
				<div className="menu">
					<DropdownItem>Hello world</DropdownItem>
					<DropdownItem
						leftIcon={<BiPlusMedical />}
						rightIcon="😕"
						goToMenu="settings"
					>
						Settings
					</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition
				in={activeMenu === 'settings'}
				unmountOnExit
				timeout={500}
				classNames="MenuSecondary"
				onEnter={calcHeight}
			>
				<div className="menu">
					<DropdownItem>Hello settings</DropdownItem>
					<DropdownItem
						leftIcon={<BiPlusMedical />}
						rightIcon="😕"
						goToMenu="main"
					>
						Go back
					</DropdownItem>
				</div>
			</CSSTransition>
		</div>
	);
}

export function Navbar(props) {
	return (
		<nav className="Navbar">
			<ul className="Navbar-nav"> {props.children} </ul>
		</nav>
	);
}

export function NavItem(props) {
	const [open, setOpen] = useState(false);

	return (
		<li className="NavItem">
			<a href="#!" className="IconButton" onClick={() => setOpen(!open)}>
				{props.icon}
			</a>

			{open && props.children}
		</li>
	);
}
