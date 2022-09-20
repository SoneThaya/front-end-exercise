import { useState, useEffect } from "react";
import axios from "axios";

export const SetOccupationAndStates = () => {
  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);
  const [error, setError] = useState(null);

  const getOccupationsAndStates = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}`)
      .then((response) => {
        setOccupations(response.data.occupations);
        setStates(response.data.states);
      })
      .catch((err) => {
        setError(err);
      });
  };
  useEffect(() => {
    getOccupationsAndStates();
  }, []);

  return { occupations, states, error };
};

export const postFormData = (name, email, password, occupation, state) => {
  let resData = axios
    .post(`${process.env.REACT_APP_BASE_URL}`, {
      name,
      email,
      password,
      occupation,
      state,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });

  return resData;
};
