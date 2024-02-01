/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getPersons, addPerson, deletePerson, updatePerson } from "./Backend";
import "./App.css";

const Filter = ({ filter, setFilter }) => {
    return (
        <div>
            filter shown with{" "}
            <input
                value={filter}
                onChange={(event) => {
                    setFilter(event.target.value);
                }}
            />
        </div>
    );
};

const Form = ({ newName, setNewName, newNumber, setNewNumber, addPerson }) => {
    return (
        <form>
            <div>
                name:{" "}
                <input
                    value={newName}
                    onChange={(event) => {
                        setNewName(event.target.value);
                    }}
                />
            </div>
            <div>
                number:{" "}
                <input
                    value={newNumber}
                    onChange={(event) => {
                        setNewNumber(event.target.value);
                    }}
                />
            </div>
            <div>
                <button type="submit" onClick={addPerson}>
                    add
                </button>
            </div>
        </form>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const Notification = ({ message }) => {
        if (message === null) {
            return null;
        }

        return <div className="error">{message}</div>;
    };

    useEffect(() => {
        getPersons().then((response) => setPersons(response.data));
    }, []);

    const addPersonHandler = (event) => {
        if (persons.some((person) => person.name === newName)) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                event.preventDefault();
                const person = persons.find(
                    (person) => person.name === newName
                );
                const changedPerson = { ...person, number: newNumber };
                updatePerson(person.id, changedPerson).then((response) => {
                    setPersons(
                        persons.map((person) =>
                            person.id !== changedPerson.id
                                ? person
                                : response.data
                        )
                    );
                    setNewName("");
                    setNewNumber("");
                    setErrorMessage(
                        `Updated ${changedPerson.name}'s number to ${changedPerson.number}`
                    );
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);
                });
            }
            return;
        }
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber,
        };
        addPerson(personObject).then((response) => {
            setPersons(persons.concat(response.data));
            setNewName("");
            setNewNumber("");
            setErrorMessage(`Added ${personObject.name}`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        });
    };

    const deletePersonHandler = (id) => {
        deletePerson(id).then(() => {
            setPersons(persons.filter((person) => person.id !== id));
        });
    };

    const Numbers = ({ persons, filter }) => {
        return (
            <div>
                {persons
                    .filter((person) =>
                        person.name.toLowerCase().includes(filter.toLowerCase())
                    )
                    .map((person) => (
                        <div key={person.id}>
                            <p>
                                {person.name} {person.number}
                                <input
                                    type="button"
                                    value="Delete"
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                `Delete ${person.name}?`
                                            )
                                        ) {
                                            deletePersonHandler(person.id);
                                        }
                                    }}
                                />
                            </p>
                        </div>
                    ))}
            </div>
        );
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} className="error" />
            <Filter filter={filter} setFilter={setFilter}></Filter>

            <h3>add a new</h3>
            <Form
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                addPerson={addPersonHandler}
            />
            <h2>Numbers</h2>
            <Numbers persons={persons} filter={filter} />
        </div>
    );
};

export default App;
