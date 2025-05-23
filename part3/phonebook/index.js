require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const Person = require("./models/person");
/*
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
*/
app.use(express.static("dist"));

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  /*
    const id = request.params.id;
    const person = persons.find(p => p.id === id);

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
        */
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  //persons = persons.filter(p => p.id !== id);
  response.status(204).end();
});
/*
const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(p => Number(p.id)))
    : 0;
    return String(maxId + 1)
}
*/
app.post("/api/persons", (request, response) => {
  const body = request.body;
/*
  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  } else if (Person.find((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
*/
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  console.log(request.headers);
  console.log(person);

  //persons = persons.concat(person)
  //response.json(person)
  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get("/info", (request, response) => {
  response.send(`
        <p>Phonebook has info for ${null} people</p>
        <p>${new Date()}</p>
        `);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
