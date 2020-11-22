import React from 'react';
import './Notes.css';
import 'draft-js/dist/Draft.css';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useEffect } from 'react';

function tick() {
	console.log(localStorage.getItem('notes'));
}
setInterval(tick, 1000);

function runFirst() {
	if (
		!localStorage.getItem('notes') ||
		!JSON.parse(localStorage.getItem('notes'))['notes']
	) {
		bigError();
	}
	for (
		let item = 0;
		item < JSON.parse(localStorage.getItem('notes'))['notes'].length;
		item++
	) {
		if (JSON.parse(localStorage.getItem('notes'))['notes'][item] === null) {
			localStorage.setItem('notes', 'false');
			window.location.reload();
		}
	}
}

function bigError() {
	localStorage.setItem(
		'notes',
		'{"notes": [{"name": "First note","text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\\n In tellus integer feugiat scelerisque varius morbi enim nunc.\\n Diam sollicitudin tempor id eu nisl nunc mi.\\n Sed adipiscing diam donec adipiscing tristique.\\n Elementum tempus egestas sed sed risus pretium quam vulputate dignissim.\\n Tincidunt praesent semper feugiat nibh sed pulvinar.\\n Mattis enim ut tellus elementum sagittis.\\n Elementum facilisis leo vel fringilla est.\\n Vitae tortor condimentum lacinia quis vel.\\n Aliquet eget sit amet tellus cras adipiscing.\\n Augue neque gravida in fermentum et sollicitudin ac orci phasellus.\\n Pretium quam vulputate dignissim suspendisse.\\n Tempus quam pellentesque nec nam.\\n Id nibh tortor id aliquet lectus proin nibh nisl condimentum.\\n Porttitor rhoncus dolor purus non.\\n Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque.\\n Amet massa vitae tortor condimentum lacinia quis vel eros.\\n Enim nulla aliquet porttitor lacus luctus accumsan tortor.\\n"}, {"name": "Another note","text": "Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit.\\n Pharetra et ultrices neque ornare aenean.\\n Orci sagittis eu volutpat odio facilisis mauris sit amet.\\n Tempus iaculis urna id volutpat lacus laoreet.\\n Aliquet lectus proin nibh nisl condimentum id venenatis a.\\n Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet.\\n Orci sagittis eu volutpat odio facilisis.\\n Leo urna molestie at elementum eu facilisis sed.\\n Non diam phasellus vestibulum lorem.\\n Egestas integer eget aliquet nibh praesent tristique magna sit amet.\\n Eget nulla facilisi etiam dignissim diam quis enim.\\n Vel pretium lectus quam id leo.\\n Vitae elementum curabitur vitae nunc sed velit dignissim sodales.\\n In ornare quam viverra orci sagittis eu.\\n Vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam.\\n Arcu dui vivamus arcu felis bibendum ut.\\n"}]}'
	);
	window.location.reload();
}

runFirst();

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
	var list = JSON.parse(localStorage.getItem('notes'))['notes'];

	let items = [];
	for (let i = 0; i < list.length; i++) {
		items.push(ListItem(i));
	}

	return (
		<div id="NoteList">
			{props.children}
			<div id="Names">{items}</div>
		</div>
	);
}

function ListItem(key) {
	var list = JSON.parse(localStorage.getItem('notes'))['notes'];
	function showNote() {
		var list = JSON.parse(localStorage.getItem('notes'))['notes'];
		var area = document.getElementById('NoteArea') as HTMLTextAreaElement;
		area.value = list[key].text;
		selected = key;
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
			{list[key].name}
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
		var list: Object[] = storage['notes'];
		list.splice(selected, 1);
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
		var area = document.getElementById('NoteArea') as HTMLTextAreaElement;
		var noteList = JSON.parse(localStorage.getItem('notes'))['notes'];
		if (!noteList[0]) {
			bigError();
		} else {
			area.value = noteList[0]['text'];
		}
	});

	return (
		<textarea
			id="NoteArea"
			placeholder="Skriv här"
			onInput={() => {
				updateLocalStorage(
					'text',
					(document.getElementById('NoteArea') as HTMLTextAreaElement).value
				);
			}}
		></textarea>
	);
}
