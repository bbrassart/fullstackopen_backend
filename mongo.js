const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `
  mongodb+srv://user_01:${password}@cluster0-1ep39.mongodb.net/phonebook?retryWrites=true&w=majority
`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person
    .find({})
    .then(resp => {
      console.log(`Phonebook`);
      resp.forEach(contact => { console.log(contact.name, contact.number) });
      mongoose.connection.close();
    });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save().then(resp => {
    console.log(`added ${resp.name} ${resp.number} to phonebook`);
    mongoose.connection.close();
  });
}


