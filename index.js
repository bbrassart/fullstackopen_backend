const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morganMiddleWare = require('morgan');

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

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: 'some info is missing'
    });
  }

  if(persons.some(person => person.name === name)) {
    return response.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = {
    name,
    number,
    id: Math.ceil(Math.random() * 10000000)
  };

  persons = persons.concat(person);
  response.json(person);
});

app.get('/api/persons/:id', (request, response) => {
  const requestedPerson = persons.find(person => person.id === Number(request.params.id));
  requestedPerson ? response.json(requestedPerson) : response.status(404).end();
});

app.get('/info', (request, response) => {
  const html = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`;
  response.send(html);
});

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter(person => person.id !== Number(request.params.id));
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
