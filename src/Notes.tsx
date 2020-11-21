import React from 'react';
import './Notes.css';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

if (localStorage.getItem('notes')) {
	localStorage.setItem(
		'notes',
		'{"notes": [["first note with a very long name", "note line 1", "note line 2"], ["different note", "another line"]]}'
	);
}

export default function Notes() {
	return (
		<div className="container">
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
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);

	return <textarea id="Note" placeholder="Type text here"></textarea>;
}
