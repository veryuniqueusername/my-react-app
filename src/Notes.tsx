import React from 'react';
import './Notes.css';
import 'draft-js/dist/Draft.css';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

if (!localStorage.getItem('notes')) {
	localStorage.setItem(
		'notes',
		'{"notes": {"0": {"name": "first note with a very long name","text": "Lorem ipsum\\nidk"},"1": {"name": "different note","text": "another line"}}}'
	);
}

let selected = -1;

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
		console.log('selected ' + key);
	}

	return (
		<li
			className="ListItem"
			contentEditable="true"
			onClick={showNote}
			onInput={() => {
				updateLocalStorage(
					'name',
					(document.getElementById('Note') as HTMLTextAreaElement).value
				);
			}}
			key={key}
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
	var selectedNote = JSON.parse(localStorage.getItem('notes'))['notes'][
		selected
	];
	selectedNote[type] = text;
	console.log('updated storage');
}

function Note() {
	return (
		<textarea
			id="Note"
			placeholder={selected === -1 ? 'Välj en anteckning' : 'Skriv här'}
			disabled={selected === -1 ? true : false}
			onInput={() => {
				updateLocalStorage(
					'text',
					(document.getElementById('Note') as HTMLTextAreaElement).value
				);
			}}
		></textarea>
	);
}
