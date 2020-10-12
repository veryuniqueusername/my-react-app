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

	for (let day = 0; day < SCHEDULE.length; day++) {
		for (let data = 0; data < SCHEDULE[day].length; data++) {
			scheduleCalc(
				SCHEDULE[day][data].subject,
				SCHEDULE[day][data].start,
				SCHEDULE[day][data].end
			);
		}
	}
	return <div className="Schedule"></div>;
}

function scheduleCalc(name: string, start: Array<number>, end: Array<number>) {
	return <div></div>;
}
