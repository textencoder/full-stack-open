import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll("http://localhost:3001/persons").then((response) => {
      //console.log(response.data)
      setPersons(response.data);
    });
  }, []);

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
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personService.getAll().then((response) => {
          //console.log(response.data)
          for (const person of response.data) {
            if (person.name.toLowerCase() === newName.toLowerCase()) {
              //console.log(person)
              personService.update(person.id, { ...person, number: newNumber });
              setMessage({content: `Updated ${newName}`, type: 'success'})
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            }
          }
        });
      }
      //alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    personService.create(personObject).then((response) => {
      console.log(response);
      setMessage({content: `Added ${newName}`, type: 'success'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });

    // setPersons([
    //   ...persons,
    //   { name: newName, number: newNumber, id: persons.length + 1 },
    // ]);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message && 
      <Notification message={message} />
      }
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
            .filter((person) =>
              person.name.toLowerCase().includes(props.filter)
            )
            .map((person) => {
              return (
                <Person
                  key={person.name}
                  name={person.name}
                  number={person.number}
                  id={person.id}
                />
              );
            })
        : props.persons.map((person) => {
            return (
              <Person
                key={person.name}
                name={person.name}
                number={person.number}
                id={person.id}
              />
            );
          })}
    </>
  );
};

const Person = (props) => {
  const handleDelete = (id, name) => {
    try {
      if (window.confirm(`Delete ${name}?`)) {
        personService.remove(id);
      }
    } catch (error) {
      console.log('error caught: ', error)
      setMessage({content: `Information of ${newName} has already been removed from server`, type: 'error'});
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    
  };

  return (
    <div style={{ display: "flex" }}>
      <p>
        {props.name} {props.number}
      </p>
      <button onClick={() => handleDelete(props.id, props.name)} type="button">
        delete
      </button>
    </div>
  );
};

const Notification = (props) => {
  const onSuccess = {
    border: '2px solid green',
    borderRadius: '5px',
    color: 'green',
    background: "rgba(0, 255, 0, 0.25)",
    fontSize: "2rem",
    height: "50px",
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 10,
  }

  const onError = {
    border: '2px solid red',
    borderRadius: '5px',
    color: 'red',
    background: "rgba(255, 0, 0, 0.25)",
    fontSize: "2rem",
    height: "50px",
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 10,
  }

  return (
    <div style={props.message.type == 'success' ? onSuccess : onError}>
      {props.message.content}
    </div>
  )
}

export default App;