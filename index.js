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

app.get('/api/persons', (request, response, next) => {
  Person
    .find({})
    .then(people => { response.json(people.map(person => person.toJSON())) })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
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
    })
    .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => {
      person ? response.json(person.toJSON()) : response.status(404).end();
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  const updatedPerson = { name, number };

  Person.findByIdAndUpdate(request.params.id, updatedPerson, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
});

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      const html = `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`;
      response.send(html);
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
