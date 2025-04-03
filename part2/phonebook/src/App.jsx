import { useState, useEffect } from "react";
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll('http://localhost:3001/persons')
    .then(response => {
      //console.log(response.data)
      setPersons(response.data);
    })
  }, [persons])

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

    const personObject = { 
      name: newName, 
      number: newNumber, 
      id: persons.length + 1
      }

    personService
    .create(personObject)
    .then(response => {
      console.log(response);
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })

    // setPersons([
    //   ...persons,
    //   { name: newName, number: newNumber, id: persons.length + 1 },
    // ]);
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
