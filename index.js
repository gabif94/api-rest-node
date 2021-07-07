require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const Note = require('./models/Note')
const notFound = require('./middlewares/notFound')
const handleErrors = require('./middlewares/handleErrors')

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  Note.findById(id).then(note => {
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
})

app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  const note = req.body

  const newNote = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNote, { new: true }).then(result => res.json(result))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  Note.findByIdAndDelete(id).then(noteDeleted => {
    res.status(204).json(noteDeleted)
  }).catch(err => {
    next(err)
  })
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'content is missing'
    })
  }

  const newNote = new Note({
    content: note.content,
    important: typeof important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  })

  newNote.save().then(savedNote => {
    res.status(201).json(savedNote)
  })
})

app.use(notFound)

app.use(handleErrors)

app.listen(port, () => {
  console.log(`App corriendo en puerto ${port}`)
})
