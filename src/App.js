// App.jsx
import React, { useState, useEffect } from 'react';
import PersonList from './components/PersonList';
import useFilterByLocation from './components/useFilterByLocation';

const App = () => {
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import('./data/people_data.json');
        setData(response.default);

        const uniqueLocations = [
          ...new Set(response.default.map((person) => person.location)),
        ];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Błąd podczas pobierania danych', error);
      }
    };

    fetchData();
  }, []);

  const filteredPeople = useFilterByLocation(data, selectedLocation);

  const handleUpdatePerson = (updatedPerson) => {
    setData((prevData) =>
      prevData.map((person) =>
        person.id === updatedPerson.id ? updatedPerson : person
      )
    );
  };

  return (
    <div>
      <h1>Przykładowa Aplikacja</h1>

      <label>
        Wybierz lokalizację do filtrowania:
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Wszystkie lokalizacje</option>
          {[...new Set(locations)].map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>

      <PersonList people={filteredPeople} onUpdatePerson={handleUpdatePerson} />
    </div>
  );
};

export default App;
