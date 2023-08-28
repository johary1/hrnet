import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import employeesData from "../data/employees.json";
import Select from "../components/Select";
import FormSearch from "../components/FormSearch";
import Pagination from "../components/Pagination";
import "./style/CurrentEmployees.css";

const CurrentEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(5);

  const loadEmployees = () => {
    setEmployees(employeesData);
  };
  const handleEmployeesPerPageChange = (event) => {
    setEmployeesPerPage(event.target.value);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const columns = [
    {
      name: "First Name",
      data: "firstName",
    },
    {
      name: "Last Name",
      data: "lastName",
    },
    {
      name: "Start Date",
      data: "startDate",
    },
    {
      name: "Department",
      data: "department",
    },
    {
      name: "Date of Birth",
      data: "dateOfBirth",
    },
    {
      name: "Street",
      data: "street",
    },
    {
      name: "City",
      data: "city",
    },
    {
      name: "State",
      data: "state",
    },
    {
      name: "Zip Code",
      data: "zipCode",
    },
  ];

  // Calculate the indexes for pagination
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="current-employees__wrapper">
      <Container id="employee-div">
        <div className="employee-list__header">
          <h1 className="employee-list__title">Current Employees</h1>
          <div className="employee-list__filter">
            <div className="show-entries">
              <span id="entries-txt">Show entries</span>
              <Select
                options={[
                  { value: 5, label: "5" },
                  { value: 10, label: "10" },
                  { value: 20, label: "20" },
                  { value: 50, label: "50" },
                  { value: 100, label: "100" },
                ]}
                onChange={handleEmployeesPerPageChange}
              />
            </div>
            <div className="form-search__wrapper">
              <FormSearch />
            </div>
          </div>
        </div>
        <div className="table-container">
          <Table responsive>
            <thead>
              <tr>
                {columns.slice(0, 4).map((column) => (
                  <th key={column.name} className="sticky-cell">
                    {column.name}
                  </th>
                ))}
                {columns.slice(4).map((column) => (
                  <th key={column.name}>{column.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee, index) => (
                <tr key={index}>
                  {columns.slice(0, 4).map((column) => (
                    <td key={column.name} className="sticky-cell">
                      {employee[column.data]}
                    </td>
                  ))}
                  {columns.slice(4).map((column) => (
                    <td key={column.name}>{employee[column.data]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Pagination
          employeesPerPage={employeesPerPage}
          totalEmployees={employees.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Container>
    </div>
  );
};

export default CurrentEmployees;
