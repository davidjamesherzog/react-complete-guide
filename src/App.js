import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Person from './Person/Person';

const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color: black;
  }
`;

const app = props => {
  const [ personsState, setPersonsState ] = useState({
    persons: [
      { id: '1', name: 'Max', age: 28 },
      { id: '2', name: 'Manu', age: 29 },
      { id: '3', name: 'Stephanie', age: 26 }
    ],
    showPersons: false
  });

  const switchNameHandler = (newName) => {
    setPersonsState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    });
  };

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

    /* style.backgroundColor = 'red';
    style[':hover'] = {
      backgroundColor: 'salmon',
      color: 'black'
    } */
  }

  const classes = [];
  if (personsState.persons.length <= 2) {
    classes.push('red');
  }
  if (personsState.persons.length <= 1) {
    classes.push('bold');
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p className={classes.join(' ')}>This is really working</p>
      <StyledButton alt={personsState.showPersons} onClick={() => togglePersonsHandler()}>Toggle Persons</StyledButton>
      {persons}
    </div>
  );
}

export default app;
