import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Calendar.css';

export default function Calendar() {
	return (
		<div>
			<h1>Kalender</h1>
			<Items />
		</div>
	);
}

function Items() {
	var items1 = [];
	var items2 = [];
	var items3 = [];
	var json = require('./Calendar.json');
	for (let i = 0; i < json['items'].length; i++) {
		var j = i % 3;
		var list;
		switch (j) {
			case 0:
				list = items1;
				break;
			case 1:
				list = items2;
				break;
			case 2:
				list = items3;
				break;
		}
		list.push(connectItem(json['items'][i]));
	}

	return (
		<div className="container">
			<div className="div">{items1}</div>
			<div className="div">{items2}</div>
			<div className="div">{items3}</div>
		</div>
	);
}

function connectItem(json) {
	var info = '';
	var type = json['type'];
	info += json['text'].join('\n');
	var classes = 'item ' + type;

	return (
		<div className={classes}>
			<p className="header">{json['subject']}</p>
			<h1>{json['title']}</h1>
			<ReactMarkdown>{info}</ReactMarkdown>
		</div>
	);
}
