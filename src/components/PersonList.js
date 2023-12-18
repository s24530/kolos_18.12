import React from 'react';
import Person from "./Person"

const PersonList = ({ people }) => {
  return (
    <ul>
    {people.map((person)=>
    <Person person={person}/>
    )}
    </ul>
  );
};

export default PersonList;
