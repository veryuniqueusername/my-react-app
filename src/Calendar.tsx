import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Calendar.css';

export default function Calendar() {
	return (
		<div>
			<h1>Kalender</h1>
			<div className="DateFormatList">
				<DateChangerButton type="Date" />
				<DateChangerButton type="Week" />
			</div>
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
	var date = json['weekday'] + ' ';
	if (localStorage.getItem('dateformat') === 'Date') {
		date += json['date'];
	} else {
		date += 'Vecka ' + json['week'];
	}

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

function DateChangerButton(props) {
	var classes = 'DateChanger';
	if (localStorage.dateformat === props.type) {
		classes += ' DateChangerActive';
	}
	return (
		<p
			className={classes}
			onClick={() => {
				localStorage.setItem('dateformat', props.type);
				window.location.reload();
			}}
		>
			{props.type}
		</p>
	);
}
