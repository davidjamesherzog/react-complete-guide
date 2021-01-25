import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const app = props => {
  const [ personsState, setPersonsState ] = useState({
    persons: [
      { id: '1', name: 'Max', age: 28 },
      { id: '2', name: 'Manu', age: 29 },
      { id: '3', name: 'Stephanie', age: 26 }
    ],
    showPersons: false
  });

  const nameChangedHandler = (event, id) => {
    const personIndex = personsState.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...personsState.persons[personIndex]
    };
    person.name = event.target.value;

    const state = {
      ...personsState
    };
    state.persons[personIndex] = person;
    setPersonsState(state);
  };

  const deletePersonHandler = (personIndex) => {
    const state = {
      ...personsState
    };
    state.persons.splice(personIndex, 1);
    setPersonsState(state);
  };

  const togglePersonsHandler = () => {
    const state = {
      ...personsState
    };
    state.showPersons = !state.showPersons;
    setPersonsState(state);
  };

  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };

  let persons = null;

  if (personsState.showPersons) {
    persons = (
      <div>
        {personsState.persons.map((person, index) => {
          return <Person
            click={() => deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            key={person.id}
            changed={(event) => nameChangedHandler(event, person.id)} />
        })}
      </div>
    )
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working</p>
      <button style={style} onClick={() => togglePersonsHandler()}>Toggle Persons</button>
      {persons}
    </div>
  );
}

export default app;
