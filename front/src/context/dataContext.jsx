import React, { useState } from "react";
import axios from "axios";

export const DataContext = React.createContext();

export const useDataContext = () => React.useContext(DataContext);

export const DataProvider = (props) => {
  const [personas, setPersonas] = useState([]);

  const url = "http://localhost:3000/persona";
  const getPersonas = async () => {
    const response = await axios.get(url);
    setPersonas(response.data);
  };

  return (
    <DataContext.Provider value={{ personas, getPersonas }}>
      {props.children}
    </DataContext.Provider>
  );
};
