import React, { useEffect } from 'react';
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

export function Food() {
	useEffect(() => {
		document.getElementById('food').innerHTML = food();
	});

	return <p id="food">Loading...</p>;
}

export function food() {
	const PROXY = 'https://cors-anywhere.herokuapp.com/';
	const WEBSITE = 'https://skolmaten.se/karraskolan/rss/days/?offset=0';
	const xmlToJSON = require('xmltojson');

	function foo(callback) {
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				// request is done
				if (xhr.status === 200) {
					// successfully
					callback(xhr.responseText); // we're calling our method
				}
			}
		};

		xhr.open('GET', PROXY + WEBSITE, false);
		xhr.send();
	}

	foo(function (xmlString) {
		var json = xmlToJSON.parseString(xmlString);
		if (json['rss']['0']['channel']['0']['item'] === undefined) {
			result = undefined;
		} else {
			result =
				json['rss']['0']['channel']['0']['item']['0']['description']['0'][
					'_text'
				];
		}
	});

	var result;
	if (result === undefined) {
		return 'Nothing for today';
	} else {
		return result;
	}
}
