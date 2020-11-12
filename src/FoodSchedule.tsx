import React, { useEffect } from 'react';
import './FoodSchedule.css';

export default function Info() {
	return (
		<div>
			<Food />
		</div>
	);
}

export function Food() {
	var dayList = [];
	var foodList = [];
	food('food').forEach((arr) => {
		foodList.push(arr);
	});

	food('not food').forEach((arr) => {
		dayList.push(arr);
	});

	console.log(foodList);
	console.log(dayList);

	useEffect(() => {
		for (let i = 0; i < 5; i++) {
			document.getElementById('foodWeek').innerHTML +=
				'<p class="day">' + dayList[i] + '</p>';
			document.getElementById('foodWeek').innerHTML +=
				'<p>' + foodList[i] + '</p>';
			if (i !== 4) {
				document.getElementById('foodWeek').innerHTML += '<hr>';
			}
		}
	});

	return <div id="foodWeek"></div>;
}

export function food(part: String) {
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
		if (part === 'food') {
			json['rss']['0']['channel']['0']['item'].forEach((arr) => {
				result.push(arr['description']['0']['_text']);
			});
		} else {
			json['rss']['0']['channel']['0']['item'].forEach((arr) => {
				result.push(arr['title']['0']['_text']);
			});
		}
	});

	var result;
	if (result === undefined) {
		return 'wtf';
	} else {
		return result;
	}
}
