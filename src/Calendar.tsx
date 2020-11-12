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
	var length = json['items'].length;
	var listn = 1;
	var first = Math.ceil(length / 3);
	var middle = Math.floor(length / 3);
	var last = length - first - middle;
	for (let i = 0; i < length; i++) {
		var list;
		switch (listn) {
			case 1:
				list = items1;
				break;
			case 2:
				list = items2;
				break;
			case 3:
				list = items3;
				break;
		}
		if ((listn === 1 && (i + 1) % first === 0) || (listn === 2 && (i + 1) % middle === 0)) {
			listn++;
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
	var date = `${json['weekday']} ${json['date']}, v.${json['week']}`;

	return (
		<div className={classes}>
			<div className="header">
				<p className="subject">{json['subject']}</p>
				<p className="date">{date}</p>
			</div>
			<h1>{json['title']}</h1>
			<ReactMarkdown>{info}</ReactMarkdown>
		</div>
	);
}
