import { useState, useEffect } from 'react';

const useFilterByLocation = (people, location) => {
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {
    if (location === '') {
      setFilteredPeople(people);
    } else {
      const filtered = people.filter((person) => person.location === location);
      setFilteredPeople(filtered);
    }
  }, [people, location]);

  return filteredPeople;
};

export default useFilterByLocation;
