const express = require('express');
const app = express();

const persons = [
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

app.get('/api/persons/:id', (request, response) => {
  const requestedPerson = persons.find(person => person.id === Number(request.params.id));
  requestedPerson ? response.json(requestedPerson) : response.status(404).end();
});

app.get('/info', (request, response) => {
  const html = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`;
  response.send(html);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});