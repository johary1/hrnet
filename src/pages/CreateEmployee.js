import React, { useState, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import departmentsData from "../data/departments.json";
import statesData from "../data/states.json";
import "./style/CreateEmployee.css";
import { validateForm } from "../utils";
import Select from "../components/Select";
import DatePickerWrapper from "../components/DatePickerWrapper";
import FormInput from "../components/FormInput";

const CreateEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const selectedDOBRef = useRef(null);
  const selectedStartDateRef = useRef(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const selectedDepartmentRef = useRef("");
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event, inputSetter, errorKey) => {
    const inputValue = event.target.value;
    const updatedErrors = {
      ...formErrors,
      [errorKey]: !inputValue ? "This field is required" : "",
    };
    setFormErrors(updatedErrors);
    inputSetter(inputValue);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const { isValid, errors } = validateForm(
      firstName,
      lastName,
      selectedDOBRef.current,
      selectedStartDateRef.current,
      street,
      city,
      state,
      zipCode,
      selectedDepartmentRef.current
    );

    setFormErrors(errors);

    if (isValid) {
      // Convert Date objects to ISO strings
      const isoSelectedDOB = selectedDOBRef.current
        ? selectedDOBRef.current.toISOString()
        : null;
      const isoSelectedStartDate = selectedStartDateRef.current
        ? selectedStartDateRef.current.toISOString()
        : null;

      // Create the employee data object
      const employeeData = {
        firstName,
        lastName,
        selectedDOB: isoSelectedDOB,
        selectedStartDate: isoSelectedStartDate,
        street,
        city,
        state,
        zipCode,
        selectedDepartment: selectedDepartmentRef.current.toString(),
      };

      //console.log(employeeData);

      // Serialize the employeeData object
      const serializedEmployeeData = JSON.stringify(employeeData);

      localStorage.setItem("employeeData", serializedEmployeeData);
      alert("New employee was successfully added!");

      // Clear form fields
      setFirstName("");
      setLastName("");
      selectedDOBRef.current = null;
      selectedStartDateRef.current = null;
      setStreet("");
      setCity("");
      setState("");
      setZipCode("");
      selectedDepartmentRef.current = "";
      setFormErrors({});
    }
  };

  return (
    <Container className="form-container">
      <Form className="form" onSubmit={handleSave}>
        <h1 className="form-title">Register a new employee</h1>
        <FormInput
          id="firstname"
          label="First Name"
          value={firstName}
          onChange={(e) => handleInputChange(e, setFirstName, "firstName")}
          isInvalid={formErrors.firstName}
        />
        <FormInput
          id="lastname"
          label="Last Name"
          value={lastName}
          onChange={(e) => handleInputChange(e, setLastName, "lastName")}
          isInvalid={formErrors.lastName}
        />
        <FormInput
          id="dob"
          label="Date of Birth"
          value={selectedDOBRef.current}
          onChange={(date) => {
            selectedDOBRef.current = date;
            if (date) {
              setFormErrors((prevErrors) => ({
                ...prevErrors,
                selectedDOB: "",
              }));
            }
          }}
          as={DatePickerWrapper}
          selectedDate={selectedDOBRef.current}
          isInvalid={formErrors.selectedDOB}
        />

        <FormInput
          id="start-date"
          label="Start Date"
          value={selectedStartDateRef.current}
          onChange={(date) => {
            selectedStartDateRef.current = date;
            if (date) {
              setFormErrors((prevErrors) => ({
                ...prevErrors,
                selectedStartDate: "",
              }));
            }
          }}
          as={DatePickerWrapper}
          selectedDate={selectedStartDateRef.current}
          isInvalid={formErrors.selectedStartDate}
        />
        <Form.Group className="form-group" id="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
              if (e.target.value) {
                setFormErrors((prevErrors) => ({ ...prevErrors, street: "" }));
              }
            }}
            isInvalid={formErrors.street}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.street}
          </Form.Control.Feedback>
          <Form.Control
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              if (e.target.value) {
                setFormErrors((prevErrors) => ({ ...prevErrors, city: "" }));
              }
            }}
            isInvalid={formErrors.city}
          />
          <Form.Control.Feedback className="error-address" type="invalid">
            {formErrors.city}
          </Form.Control.Feedback>
          <div className="address-group">
            <Form.Control
              id="state"
              as="select"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                if (e.target.value) {
                  setFormErrors((prevErrors) => ({ ...prevErrors, state: "" }));
                }
              }}
              isInvalid={formErrors.state}
            >
              <option value="">State</option>
              {statesData.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback className="error-address" type="invalid">
              {formErrors.state}
            </Form.Control.Feedback>
            <Form.Control
              id="zipCode"
              type="number"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
                if (e.target.value) {
                  setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    zipCode: "",
                  }));
                }
              }}
              isInvalid={formErrors.zipCode}
            />
            <Form.Control.Feedback className="error-address" type="invalid">
              {formErrors.zipCode}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group id="department">
          <Form.Label>Department</Form.Label>
          <Select
            className="department-select"
            options={departmentsData}
            value={selectedDepartmentRef.current}
            onChange={(value) => {
              selectedDepartmentRef.current = value;
              if (value) {
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  selectedDepartment: "",
                }));
              }
            }}
            placeholder="Department"
            isInvalid={formErrors.selectedDepartment}
          />
          {formErrors.selectedDepartment && (
            <div className="invalid-feedback">
              {formErrors.selectedDepartment}
            </div>
          )}
        </Form.Group>
        <Button className="save-btn" variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default CreateEmployee;
