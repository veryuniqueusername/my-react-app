import React from 'react';
import './Notes.css';

if (localStorage.getItem('notes')) {
	localStorage.setItem(
		'notes',
		'{"notes": [["first note with a long name", "note line 1", "note line 2"], ["different note", "another line"]]}'
	);
}

export default function Notes() {
	return (
		<div>
			<NoteList />
			<Note />
		</div>
	);
}

function NoteList() {
	var items = [];
	var string = localStorage.getItem('notes');
	var json = JSON.parse(string);
	var list = json['notes'];
	list.forEach((i) => {
		items.push(ListItem(i));
	});

	return <div id="List">{items}</div>;
}

function ListItem(arr) {
	var classes = 'ListItem';

	function addText() {}

	return (
		<li className={classes} onClick={addText}>
			{arr[0]}
		</li>
	);
}

function Note() {
	return <textarea id="Note"></textarea>;
}
