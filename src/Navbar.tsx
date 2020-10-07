import React from 'react';

export function Navbar(props) {
	return (
		<div className="Navbar">
			<ul className="NavbarList">{props.children}</ul>
		</div>
	);
}

export function NavbarItem(props) {
	return <li className="NavbarItem">{props.children}</li>;
}
