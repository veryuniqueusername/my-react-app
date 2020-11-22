import React from 'react';
import './Notes.css';
import 'draft-js/dist/Draft.css';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useEffect } from 'react';

if (!localStorage.getItem('notes')) {
	localStorage.setItem(
		'notes',
		'{"notes": {"0": {"name": "first note with a very long name","text": "Lorem ipsum\\nidk"},"1": {"name": "different note","text": "another line"}}}'
	);
}

let selected = 0;

export default function Notes() {
	return (
		<div className="ContainerLarge">
			<NoteList>
				<Container>
					<AddItem />
					<RemoveItem />
				</Container>
			</NoteList>
			<Note />
		</div>
	);
}

function NoteList(props: any) {
	var items = [];
	var string = localStorage.getItem('notes');
	var json = JSON.parse(string);
	var obj: Object = json['notes'];
	var key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) items.push(ListItem(obj[key], key));
	}

	return (
		<div id="List">
			{props.children}
			<div id="Names">{items}</div>
		</div>
	);
}

function ListItem(obj, key) {
	function showNote() {
		var area = document.getElementById('Note') as HTMLTextAreaElement;
		area.value = obj.text;
		selected = key;
		console.log(selected);
	}

	return (
		<li
			className="ListItem"
			contentEditable="true"
			onClick={showNote}
			onInput={() => {
				updateLocalStorage(
					'name',
					document.getElementById(`Note${key}`).innerHTML
				);
			}}
			key={key}
			id={`Note${key}`}
		>
			{obj.name}
		</li>
	);
}

function Container(props) {
	return <div className="ContainerSmall">{props.children}</div>;
}

function AddItem(props) {
	function addItem() {
		var defaultName = 'Ny anteckning';
		var storage: Object = JSON.parse(localStorage.getItem('notes'));
		storage['notes'][
			Number.parseInt(
				Object.keys(storage['notes'])[Object.keys(storage['notes']).length - 1]
			) + 1
		] = { name: defaultName, text: '' };
		console.log(storage);
		localStorage.setItem('notes', JSON.stringify(storage));
		window.location.reload();
	}

	return (
		<li className="ListButton">
			<FiPlus onClick={addItem} />
		</li>
	);
}

function RemoveItem(props) {
	function removeItem() {
		var storage: Object = JSON.parse(localStorage.getItem('notes'));
		delete storage['notes'][selected];
		console.log(storage);
		localStorage.setItem('notes', JSON.stringify(storage));
		window.location.reload();
	}

	return (
		<li className="ListButton">
			<FiTrash2 onClick={removeItem} />
		</li>
	);
}

function updateLocalStorage(type, text) {
	var storage: Object = JSON.parse(localStorage.getItem('notes'));
	var selectedNote = storage['notes'][selected];
	selectedNote[type] = text;

	localStorage.setItem('notes', JSON.stringify(storage));
}

function Note() {
	useEffect(() => {
		var area = document.getElementById('Note') as HTMLTextAreaElement;
		var noteList = JSON.parse(localStorage.getItem('notes'))['notes'];
		selected = 0;
		while (!noteList[selected]) {
			selected++;
		}
		area.value = noteList[selected]['text'];
	});

	return (
		<textarea
			id="Note"
			placeholder="Skriv här"
			onInput={() => {
				updateLocalStorage(
					'text',
					(document.getElementById('Note') as HTMLTextAreaElement).value
				);
			}}
		></textarea>
	);
}
