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
	var third = Math.ceil(length / 3);
	var last = length - third - third;
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
		if ((listn === 1 || listn === 2) && (i + 1) % third === 0) {
			listn++;
		} else if (listn === 3 && (i + 1) % last === 0) {
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
