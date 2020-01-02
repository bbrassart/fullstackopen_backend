require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morganMiddleWare = require('morgan');
const Person = require('./models/person');

app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());
morganMiddleWare.token('payload', request => JSON.stringify(request.body));

app.use(morganMiddleWare((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['payload'](req, res),
  ].join(' ')
}));

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(people => { response.json(people.map(person => person.toJSON())) });
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: 'some info is missing'
    });
  }

  const person = new Person({ name, number });

  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    });
});

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      response.json(person.toJSON());
    });
});

app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then(count => {
      const html = `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`;
      response.send(html);
    });
});

app.delete('/api/persons/:id', (request, response) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
