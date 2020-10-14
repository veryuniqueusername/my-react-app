import React from 'react';
import './Schedule.css';

export default function Schedule() {
	return (
		<div>
			<h1>Schema</h1>
			<div className="Schedule">
				<ScheduleViewer day="monday" className="Day" />
				<ScheduleViewer day="tuesday" className="Day" />
				<ScheduleViewer day="wednesday" className="Day" />
				<ScheduleViewer day="thursday" className="Day" />
				<ScheduleViewer day="friday" className="Day" />
			</div>
		</div>
	);
}

function ScheduleViewer(props) {
	const SCHEDULE = require('./Schedule.json');
	var items: any = [];
	var dayIndex: number = 0;

	switch (props.day) {
		case 'monday':
			dayIndex = 0;
			break;
		case 'tuesday':
			dayIndex = 1;
			break;
		case 'wednesday':
			dayIndex = 2;
			break;
		case 'thursday':
			dayIndex = 3;
			break;
		case 'friday':
			dayIndex = 4;
			break;
	}

	for (let data = 0; data < SCHEDULE[dayIndex].length; data++) {
		items.push(
			scheduleCalc(
				SCHEDULE[dayIndex][data].subject,
				SCHEDULE[dayIndex][data].teacher,
				SCHEDULE[dayIndex][data].room,
				SCHEDULE[dayIndex][data].start,
				SCHEDULE[dayIndex][data].end
			)
		);
	}
	return <div className="Day">{items}</div>;
}

function scheduleCalc(
	name: string,
	teacher: string,
	room: string,
	start: Array<number>,
	end: Array<number>
) {
	var starting = ((start[0] - 6) * 60 + start[1]) * (5 / 27);
	var ending = ((end[0] - 6) * 60 + end[1]) * (5 / 27);
	var length = ending - starting;
	var classes = name + ' Subject';
	console.log(starting);
	var styles = {
		height: length + '%',
		top: starting + "%"
	};

	if (name === 'LANG') {
		return (
			// <div className={classes}>
			// 	<span>SP MSG 128</span>
			// 	<span>FR JDN 116</span>
			// 	<span>TY AAD 118</span>
			// 	<span>SV/EN EWM 212</span>
			// 	<span>SV/EN FJT 231</span>
			// </div>
			<div className={classes} style={styles}>
				<span>Språkval</span>
				<span></span>
				<span></span>
			</div>
		);
	}

	return (
		<div className={classes} style={styles}>
			<span>{name}</span>
			<span>{teacher}</span>
			<span>{room}</span>
		</div>
	);
}
