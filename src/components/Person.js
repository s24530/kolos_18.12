// Person.jsx
import React from 'react';
import PersonForm from './PersonForm';

const Person = ({ person, onUpdatePerson }) => {
  return (
    <li>
      <div>
        Name: {person.name.first} {person.name.last} Location: {person.location}
        <ul>
          {person.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <PersonForm person={person} onUpdate={onUpdatePerson} />
    </li>
  );
};

export default Person;
