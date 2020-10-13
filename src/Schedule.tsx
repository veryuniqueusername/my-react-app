import React from 'react';
import './Schedule.css';

export default function Schedule() {
	return (
		<div>
			<h1>Schema</h1>
			<ScheduleViewer />
		</div>
	);
}

function ScheduleViewer() {
	const SCHEDULE = require('./Schedule.json');
	var items: any = [];

	for (let day = 0; day < SCHEDULE.length; day++) {
		for (let data = 0; data < SCHEDULE[day].length; data++) {
			items.push(
				scheduleCalc(
					SCHEDULE[day][data].subject,
					SCHEDULE[day][data].teacher,
					SCHEDULE[day][data].room,
					SCHEDULE[day][data].start,
					SCHEDULE[day][data].end
				)
			);
		}
	}
	return <div className="Schedule"> {items}</div>;
}

function scheduleCalc(
	name: string,
	teacher: string,
	room: string,
	start: Array<number>,
	end: Array<number>
) {
	var starting = start[0] * 60 + start[1];

	if (name === 'LANG') {
		return (
			<div className={name}>
				<span>SP MSG 128</span>
				<span>FR JDN 116</span>
				<span>TY AAD 118</span>
				<span>SV/EN EWM 212</span>
				<span>SV/EN FJT 231</span>
			</div>
		);
	}

	return (
		<div className={name}>
			{name} {teacher} {room}
		</div>
	);
}
