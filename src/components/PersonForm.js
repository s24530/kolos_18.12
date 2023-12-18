// PersonForm.jsx
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

const PersonForm = ({ person, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: person.name.first,
    lastName: person.name.last,
    newSkill: '',
  });

  useEffect(() => {
    setFormValues({
      firstName: person.name.first,
      lastName: person.name.last,
      newSkill: '',
    });
  }, [person]);

  const formik = useFormik({
    initialValues: formValues,
    onSubmit: (values) => {
      const updatedPerson = {
        ...person,
        name: {
          first: values.firstName,
          last: values.lastName,
        },
      };

      if (values.newSkill) {
        updatedPerson.skills = [...person.skills, values.newSkill];
      }

      onUpdate(updatedPerson);
      setIsEditing(false);
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    formik.handleChange(e);
    setFormValues(formik.values);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={formik.handleSubmit}>
          <label>
            Imię:
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Nazwisko:
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Nowa umiejętność:
            <input
              type="text"
              name="newSkill"
              value={formik.values.newSkill}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Zapisz zmiany</button>
        </form>
      ) : (
        <button onClick={toggleEdit}>Edytuj</button>
      )}
    </div>
  );
};

export default PersonForm;
