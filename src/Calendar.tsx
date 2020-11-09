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
	var items = [];
	var json = require('./Calendar.json');
	json['items'].forEach((data) => items.push(connectItem(data)));

	return <div className="div">{items}</div>;
}

function connectItem(json) {
	var info = '';
	info += json['text'].join('\n');

	return (
		<div className="item">
			<h1>{json['title']}</h1>
			<ReactMarkdown>{info}</ReactMarkdown>
		</div>
	);
}
