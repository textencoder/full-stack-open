const express = require("express");
const app = express();

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

app.use(express.json())

app.get('/', (request, response) => {
    response.send("<h1>Hello World!</h1>")
})

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    persons = persons.filter(p => p.id !== id);
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(p => Number(p.id)))
    : 0;

    const person = request.body;
    person.id = String(maxId + 1);
    console.log(request.headers)
    console.log(person);
    persons = persons.concat(person)
    response.json(person)
})

app.get("/info", (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
        `)
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})