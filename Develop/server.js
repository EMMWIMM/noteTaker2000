const express = require('express');
const path = require('path');
const termData = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
// var randomId = require('random-id');
// const api = require('./public/assets/js/index.js')
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));


//return homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//return notes html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>{
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  // res.sendfile( path.join(__dirname, '/db/db.json'))
});



// listening to port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
