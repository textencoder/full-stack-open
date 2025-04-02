import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  function handleChange(event) {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  function handleSubmit() {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    console.log("submitted: ", newName)
    setPersons([
      ...persons,
      {name: newName}
    ])
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form action={handleSubmit}>
        <div>
          name: <input onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return <p key={person.name}>{person.name}</p>
      })}
    </div>
  )
}

export default App