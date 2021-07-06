const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let notes = require('./dataMockup');

app.get('/api/notes', (req, res) => {
	res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
	const {id} = req.params;
	const data = notes.find(note => note.id == id);

	if (data) {
		res.json(data);
	} else {
		res.status(404).end();
	}
});

app.delete('/api/notes/:id', (req, res) => {
	const {id} = req.params;
	notes = notes.filter(note => note.id !== Number(id));
	res.status(204).end();
});

app.listen(port, () => {
	console.log(`App corriendo en puerto ${port}`);
});
