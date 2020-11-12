import React, { useEffect } from 'react';
foodWeek();

export default function Info() {
	return (
		<div>
			<h1>WIP</h1>
			<Food />
		</div>
	);
}

export function Food() {
	useEffect(() => {
		foodWeek().forEach((arr) => {document.getElementById('foodWeek').innerHTML += `<p>${arr}</p>`})
	});

	return <div id="foodWeek"></div>;
}

export function foodWeek() {
	// EMERGENCY ---------------------------------------
	// return 'Failed to load';
	// -------------------------------------------------

	const PROXY = 'https://agile-savannah-30433.herokuapp.com/';
	const WEBSITE = 'https://skolmaten.se/karraskolan/rss/weeks';
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
		result = [];
		json['rss']['0']['channel']['0']['item'].forEach((arr) => {
			result.push(arr['description']['0']['_text']);
		});
	});

	var result;
	if (result === undefined) {
		return 'wtf';
	} else {
		return result;
	}
}
