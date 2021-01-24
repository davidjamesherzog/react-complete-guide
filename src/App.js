import React, { useState } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

const app = props => {
  const [ personsState, setPersonsState ] = useState({
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
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

  const nameChangedHandler = (event) => {
    setPersonsState({
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26 }
      ]
    })
  };

  const togglePersonsHandler = () => {
    const state = {
      ...personsState
    };
    state.showPersons = !state.showPersons;
    setPersonsState(state);
  };

  const style = {
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'lightgreen',
      color: 'black'
    }
  };

  let persons = null;

  if (personsState.showPersons) {
    persons = (
      <div>
        <Person
          name={personsState.persons[0].name}
          age={personsState.persons[0].age} />
        <Person
          name={personsState.persons[1].name}
          age={personsState.persons[1].age}
          click={switchNameHandler.bind(this, 'Max!')}
          changed={nameChangedHandler}>My Hobbies: Racing</Person>
        <Person
          name={personsState.persons[2].name}
          age={personsState.persons[2].age} />
      </div>
    )

    style.backgroundColor = 'red';
    style[':hover'] = {
      backgroundColor: 'salmon',
      color: 'black'
    }
  }

  const classes = [];
  if (personsState.persons.length <= 2) {
    classes.push('red');
  }
  if (personsState.persons.length <= 1) {
    classes.push('bold');
  }

  return (
    <StyleRoot>
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working</p>
        <button style={style} onClick={() => togglePersonsHandler()}>Toggle Persons</button>
        {persons}
      </div>
    </StyleRoot>
  );
}

export default Radium(app);
