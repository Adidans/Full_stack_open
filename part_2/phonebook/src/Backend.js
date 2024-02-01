import axios from "axios";

const API_URL = "http://localhost:3001/persons";

export const getPersons = () => {
    return axios.get(API_URL);
};

export const addPerson = (person) => {
    return axios.post(API_URL, person);
};

export const deletePerson = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const updatePerson = (id, person) => {
    return axios.put(`${API_URL}/${id}`, person);
};
