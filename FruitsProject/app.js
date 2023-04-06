
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');


  const fruitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'You haven\'t given a name yet' ]
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String
  });
  const Fruit = mongoose.model('fruit', fruitSchema);

  const fruit = new Fruit({
    // name: "Peach",
    rating: 10,
    review: "Peaches are so yummy!"
  });

  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
  });

  const Person = mongoose.model('Person', personSchema);

  const mango = new Fruit({
    name: "mango",
    score: 8,
    review: 'You can\'t stop at one'
  })

  mango.save();

  // const person = new Person({
  //   name: "Amy",
  //   age: 12,
  //   favouriteFruit: pineapple
  // });
  
  // await person.save();

  // const kiwi = new Fruit({
  //   name: "Kiwi",
  //   score: 10,
  //   review: "The best fruit!"
  // })
  // const orange = new Fruit({
  //   name: "orange",
  //   score: 4,
  //   review: "Too sour for me"
  // })
  // const banana = new Fruit({
  //   name: "banana",
  //   score: 3,
  //   review: "Weird texture"
  // })

  // async function insertFruits() {
  //   try {
  //     await Fruit.insertMany([kiwi, orange, banana]);
  //     console.log("Successfully inserted all fruits to fruitsDB");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  
  // insertFruits();

// await fruit.save();

async function printFruits() {
  try {
    const fruits = await Fruit.find();
    fruits.forEach(function(fruit) {
      console.log(fruit);
    });
  } catch (err) {
    console.log(err);
  }

  mongoose.connection.close();
}

// printFruits();

async function updatePerson() {
  try {
    const result = await Person.updateOne(
      { name: "John" },
      { $set: { favouriteFruit: mango } }
    );
    console.log("Successfully updated", result);
  } catch (err) {
    console.log(err);
  }
}

updatePerson();


async function deleteFruit() {
  try {
    const result = await Fruit.deleteOne(
      { _id: "642dd4b21d52a7439ce5f5fa" }
    );
    console.log("Successfully deleted", result);
  } catch (err) {
    console.log(err);
  }
}

// deleteFruit();

async function deletePerson(){
  try{
    const result = await Person.deleteMany(
      {
        name: "Amy",
        age: {
          $gte: 0
        }
      }
    );
    console.log("Successfully deleted all", result);
  } catch (err) {
    console.log(err);
  }
}

// deletePerson();

}