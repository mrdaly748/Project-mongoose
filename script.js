require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Database connection error:', err));

// Define the Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String], // Array of strings
});

// Create the Person Model
const Person = mongoose.model('Person', personSchema);

// Create and Save a Record of a Model
const createAndSavePerson = async () => {
  try {
    const newPerson = new Person({
      name: 'John Doe',
      age: 30,
      favoriteFoods: ['Pizza', 'Burger'],
    });
    const savedPerson = await newPerson.save();
    console.log('Person saved:', savedPerson);
  } catch (err) {
    console.error(err);
  }
};

// Create Many Records with model.create()
const createManyPeople = async () => {
  try {
    const arrayOfPeople = [
      { name: 'Alice', age: 25, favoriteFoods: ['Salad', 'Pasta'] },
      { name: 'Bob', age: 28, favoriteFoods: ['Tacos', 'Pizza'] },
      { name: 'Charlie', age: 35, favoriteFoods: ['Steak', 'Fries'] },
    ];
    const people = await Person.create(arrayOfPeople);
    console.log('People added:', people);
  } catch (err) {
    console.error(err);
  }
};

// Use model.find() to Search Your Database
const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name });
    console.log('People found:', people);
  } catch (err) {
    console.error(err);
  }
};

// Use model.findOne() to Return a Single Matching Document
const findOneByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log('Person found:', person);
  } catch (err) {
    console.error(err);
  }
};

// Use model.findById() to Search Your Database By _id
const findPersonById = async (id) => {
  try {
    const person = await Person.findById(id);
    console.log('Person found by ID:', person);
  } catch (err) {
    console.error(err);
  }
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = async (id) => {
  try {
    const person = await Person.findById(id);
    person.favoriteFoods.push('Hamburger');
    const updatedPerson = await person.save();
    console.log('Updated person:', updatedPerson);
  } catch (err) {
    console.error(err);
  }
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = async (name) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name },
      { age: 20 },
      { new: true }
    );
    console.log('Updated person:', updatedPerson);
  } catch (err) {
    console.error(err);
  }
};

// Delete One Document Using model.findByIdAndRemove
const deleteById = async (id) => {
  try {
    const deletedPerson = await Person.findByIdAndRemove(id);
    console.log('Person deleted:', deletedPerson);
  } catch (err) {
    console.error(err);
  }
};

// MongoDB and Mongoose - Delete Many Documents with model.deleteMany()
const deleteManyPeople = async (name) => {
  try {
    const result = await Person.deleteMany({ name });
    console.log('People deleted:', result);
  } catch (err) {
    console.error(err);
  }
};

// Chain Search Query Helpers to Narrow Search Results
const queryChain = async () => {
  try {
    const result = await Person.find({ favoriteFoods: 'Burritos' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec();
    console.log('Query result:', result);
  } catch (err) {
    console.error(err);
  }
};

// Call the functions to execute them
(async () => {
  await createAndSavePerson();
  await createManyPeople();
  await findPeopleByName('Alice');
  await findOneByFood('Pizza');
  await findPersonById('example-id-here');
  await findEditThenSave('example-id-here');
  await findAndUpdate('Alice');
  await deleteById('example-id-here');
  await deleteManyPeople('Mary');
  await queryChain();
})();
