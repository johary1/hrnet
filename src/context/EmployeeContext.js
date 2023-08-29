import React, { createContext, useContext, useState, useEffect } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("employees");
    if (storedData) {
      setEmployees(JSON.parse(storedData));
    }
  }, []);

  // Save data to localStorage whenever employees change
  // useEffect(() => {
  //   localStorage.setItem("employees", JSON.stringify(employees));
  // }, [employees]);

  const addEmployee = (employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
