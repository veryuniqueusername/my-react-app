import React from 'react';
import './Schedule.css';
if (!localStorage.schedule) {
	localStorage.schedule = 'Default';
}
import(`./scheduleColors/${localStorage.schedule}.css`);

export default function Schedule() {
	return (
		<div>
			<h1>Schema</h1>
			<div className="ColorList">
				<ScheduleChangerButton theme="Default" />
				<ScheduleChangerButton theme="Grayscale" />
			</div>
			<div className="Schedule">
				<ScheduleViewer day="monday" />
				<ScheduleViewer day="tuesday" />
				<ScheduleViewer day="wednesday" />
				<ScheduleViewer day="thursday" />
				<ScheduleViewer day="friday" />
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
		items.push(scheduleCalc(SCHEDULE[dayIndex][data]));
	}
	return <div className="Day">{items}</div>;
}

function scheduleCalc(obj) {
	// INIT
	var start = obj.start;
	var end = obj.end;
	var name = obj.subject;
	var teacher = obj.teacher;
	var room = obj.room;

	function arrToTime(arr) {
		var time = arr[0];
		if (arr[1] < 10) {
			time += ':0' + arr[1];
		} else {
			time += ':' + arr[1];
		}
		console.log(time);
		return (time);
	}

	// BUNCH OF STYLING AND POSITIONING
	var starting = ((start[0] - 4.5) * 60 + start[1]) * (5 / 27) * 0.75;
	var ending = ((end[0] - 4.5) * 60 + end[1]) * (5 / 27) * 0.75;
	var length = ending - starting;
	var classes = name + ' Subject tooltip';
	var startTime = arrToTime(start);
	var endTime = arrToTime(end);
	var styles = {
		height: length + '%',
		top: starting + '%',
		width: 'calc((20% - 32px))',
	};

	// IF LANG
	if (name === 'LANG') {
		return (
			<div className= { classes } style = { styles } >
				<span>Språkval</span>
			</div>
		);
	}
	// IF ONE SUBJECT
	if (!obj.subject2) {
		return (
			<div className= { classes } style = { styles } >
				<span>{ name } </span>
			< div className = 'tooltiptext' >
				<span> {startTime} </span>
				<span> { teacher } </span>
				<span> {room} </span>
				<span> {endTime} </span>
				</div>
			</div>
		);
	}
	// IF TWO SUBJECTS
	else {
		// INIT
		var start2 = obj.start2;
		var end2 = obj.end2;
		var name2 = obj.subject2;
		var teacher2 = obj.teacher2;
		var room2 = obj.room2;
		// BUNCH OF STYLING AND POSITIONING
		var starting2 = ((start2[0] - 4.5) * 60 + start2[1]) * (5 / 27) * 0.75;
		var ending2 = ((end2[0] - 4.5) * 60 + end2[1]) * (5 / 27) * 0.75;
		var length2 = ending2 - starting2;
		var classes2 = name2 + ' Subject';
		var startTime2 = arrToTime(start2);
		var endTime2 = arrToTime(end2);
		styles.width = 'calc((20% - 32px) / 2)';
		var styles2 = {
			height: length2 + '%',
			top: starting2 + '%',
			width: 'calc((20% - 32px) / 2)',
			transform: 'translateX(100%)',
		};
		return (
			<div>
				<div className={classes} style={styles}>
					<span>{name}</span>
				</div>
				<div className={classes2} style={styles2}>
					<span>{name2}</span>
				</div>
			</div>
		);
	}
}

function ScheduleChangerButton(props) {
	return (
		<div
			className="ScheduleChanger"
			onClick={() => {
				localStorage.setItem('schedule', props.theme);
				window.location.reload();
			}}
		>
			{props.theme}
		</div>
	);
}
