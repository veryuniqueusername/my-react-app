import React from 'react';
import './Schedule.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';

// THEME
if (!localStorage.schedule) {
	localStorage.schedule = 'Default';
}
import(`./scheduleColors/${localStorage.schedule}.css`);

// CLASS
if (!localStorage.class) {
	localStorage.class = 'blue';
}

export default function Schedule() {
	return (
		<Router>
			<h1>Schema </h1>
			<div className="ClassList">
				<ClassChangerButton class="Blå" />
				<ClassChangerButton class="Röd" />
				<ClassChangerButton class="Grön" />
			</div>
			<div className="ColorList">
				<ScheduleChangerButton theme="Default" />
				<ScheduleChangerButton theme="Grayscale" />
				<ScheduleChangerButton theme="Skola24" />
			</div>
			<Switch>
				<Route exact path="/schedule">
					<ClassRedirect />
				</Route>
				<Route path="/schedule/blue">
					<ScheduleViewerClass color="blue" />
				</Route>
				<Route path="/schedule/red">
					<ScheduleViewerClass color="red" />
				</Route>
				<Route path="/schedule/green">
					<ScheduleViewerClass color="green" />
				</Route>
			</Switch>
		</Router>
	);
}

function ScheduleViewerClass(props) {
	return (
		<div className="Schedule">
			<ScheduleViewer day="monday" color={props.color} />
			<ScheduleViewer day="tuesday" color={props.color} />
			<ScheduleViewer day="wednesday" color={props.color} />
			<ScheduleViewer day="thursday" color={props.color} />
			<ScheduleViewer day="friday" color={props.color} />
		</div>
	);
}

function ScheduleViewer(props) {
	const SCHEDULE = require(`./classes/${props.color}.json`);
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
	var room = obj.room;

	function arrToTime(arr) {
		var time = arr[0];
		if (arr[1] < 10) {
			time += ':0' + arr[1];
		} else {
			time += ':' + arr[1];
		}
		return time;
	}

	// BUNCH OF STYLING AND POSITIONING
	var starting = ((start[0] - 5) * 60 + start[1]) * (5 / 27) * 0.75;
	var ending = ((end[0] - 5) * 60 + end[1]) * (5 / 27) * 0.75;
	var length = ending - starting;
	var classes = name + ' Subject tooltip';
	var startTime = arrToTime(start);
	var endTime = arrToTime(end);
	var styles = {
		height: length + 'vmin',
		top: starting + 'vmin',
		width: 'calc((20% - 32px))',
	};

	// IF LANG
	if (name === 'LANG') {
		return (
			<div className={classes} style={styles}>
				<span>Språkval </span>
				<div className="tooltiptext">
					<span> {startTime} </span>
					<span> {room} </span>
					<span> {endTime} </span>
				</div>
			</div>
		);
	}
	// IF ONE SUBJECT
	if (!obj.subject2) {
		return (
			<div className={classes} style={styles}>
				<span>{name} </span>
				<div className="tooltiptext">
					<span> {startTime} </span>
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
		var room2 = obj.room2;
		// BUNCH OF STYLING AND POSITIONING
		var starting2 = ((start2[0] - 5) * 60 + start2[1]) * (5 / 27) * 0.75;
		var ending2 = ((end2[0] - 5) * 60 + end2[1]) * (5 / 27) * 0.75;
		var length2 = ending2 - starting2;
		var classes2 = name2 + ' Subject tooltip';
		var startTime2 = arrToTime(start2);
		var endTime2 = arrToTime(end2);
		styles.width = 'calc((20% - 32px) / 2)';
		var styles2 = {
			height: length2 + 'vmin',
			top: starting2 + 'vmin',
			width: 'calc((20% - 32px) / 2)',
			transform: 'translateX(100%)',
		};
		return (
			<div>
				<div className={classes} style={styles}>
					<span>{name} </span>
					<div className="tooltiptext">
						<span> {startTime} </span>
						<span> {room} </span>
						<span> {endTime} </span>
					</div>
				</div>
				<div className={classes2} style={styles2}>
					<span>{name2} </span>
					<div className="tooltiptext">
						<span> {startTime2} </span>
						<span> {room2} </span>
						<span> {endTime2} </span>
					</div>
				</div>
			</div>
		);
	}
}

function ScheduleChangerButton(props) {
	var classes = 'ScheduleChanger';
	if (localStorage.schedule === props.theme) {
		classes += ' ScheduleChangerActive';
	}
	return (
		<p
			className={classes}
			onClick={() => {
				localStorage.setItem('schedule', props.theme);
				window.location.reload();
			}}
		>
			{props.theme}
		</p>
	);
}

function ClassChangerButton(props) {
	var classes = 'ScheduleChanger';
	var buttonClass: string;
	switch (props.class) {
		case 'Blå':
			buttonClass = 'blue';
			break;
		case 'Röd':
			buttonClass = 'red';
			break;
		case 'Grön':
			buttonClass = 'green';
			break;
	}
	if (localStorage.class === buttonClass) {
		classes += ' ScheduleChangerActive';
	}
	return (
		<Link
			to={`/schedule/${buttonClass}`}
			className={classes}
			onClick={() => {
				localStorage.setItem('class', buttonClass);
				setTimeout(() => {
					window.location.reload();
				}, 1);
			}}
		>
			{props.class}
		</Link>
	);
}

function ClassRedirect() {
	var color = '/schedule/' + localStorage.getItem('class');
	return <Redirect to={color} />;
}
