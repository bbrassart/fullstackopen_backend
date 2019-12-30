const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
