import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  function handleNameChange(event) {
    //console.log(event.target.value)
    setNewName(event.target.value);
  }

  function handleNumberChange(event) {
    //console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  function handleFilterChange(event) {
    //console.log(event.target.value);
    setFilter(event.target.value);
  }

  function handleSubmit() {
    event.preventDefault();
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([
      ...persons,
      { name: newName, number: newNumber, id: persons.length + 1 },
    ]);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter shown with <input onChange={props.handleFilterChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
      <form action={props.handleSubmit}>
        <div>
          name: <input onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  );
};

const Persons = (props) => {
  return (
    <>
    {props.filter
      ? props.persons
          .filter((person) => person.name.toLowerCase().includes(props.filter))
          .map((person) => {
            return (
              <p key={person.name}>
                {person.name} {person.number}
              </p>
            );
          })
      : props.persons.map((person) => {
          return (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          );
        })}
        </>
  )
}

export default App;
