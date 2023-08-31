import React, { useState, useRef } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import departmentsData from "../data/departments.json";
import statesData from "../data/states.json";
import "./style/CreateEmployee.css";
import "./style/MyModal.css";
import { validateForm } from "../utils";
import DatePickerWrapper from "../components/DatePickerWrapper";
import FormInput from "../components/FormInput";
import { useEmployeeContext } from "../context/EmployeeContext";

const CreateEmployee = () => {
  // Use the context hook
  const { addEmployee } = useEmployeeContext();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const selectedDOBRef = useRef(null);
  const selectedStartDateRef = useRef(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [department, setDepartment] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      department
    );

    setFormErrors(errors);

    if (isValid) {
      // Convert Date objects to ISO strings
      const isoSelectedDOB = selectedDOBRef.current
        ? selectedDOBRef.current.toISOString().split("T")[0]
        : null;
      const isoSelectedStartDate = selectedStartDateRef.current
        ? selectedStartDateRef.current.toISOString().split("T")[0]
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
        department,
      };

      // Retrieve existing data from localStorage
      const existingEmployeeData = localStorage.getItem("employees");

      // Parse existing data into an array or create an empty array if it doesn't exist yet
      const employeesArray = existingEmployeeData
        ? JSON.parse(existingEmployeeData)
        : [];

      // Add the new employee data to the array
      employeesArray.push(employeeData);

      // Stringify the updated array and store it back in localStorage
      localStorage.setItem("employees", JSON.stringify(employeesArray));

      // Add the new employee to the context
      addEmployee(employeeData);

      // Show the success modal
      setShowSuccessModal(true);

      // Clear form fields
      setFirstName("");
      setLastName("");
      selectedDOBRef.current = null;
      selectedStartDateRef.current = null;
      setStreet("");
      setCity("");
      setState("");
      setZipCode("");
      setDepartment("");
      setFormErrors({});
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <Container className="form-container">
      <Form className="form" onSubmit={handleSave}>
        <h1 className="form-title">Register a new employee</h1>
        <FormInput
          id="firstname"
          label="First Name"
          placeholder="Firstname"
          value={firstName}
          onChange={(e) => handleInputChange(e, setFirstName, "firstName")}
          isInvalid={formErrors.firstName}
        />
        <FormInput
          id="lastname"
          label="Last Name"
          placeholder="Lastname"
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

            <Form.Control
              id="department"
              as="select"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                if (e.target.value) {
                  setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    department: "",
                  }));
                }
              }}
              isInvalid={formErrors.department}
            >
              <option value="">Department</option>
              {departmentsData.map((department) => (
                <option key={department.value} value={department.value}>
                  {department.value}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback className="error-address" type="invalid">
              {formErrors.selectedDepartment}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Button className="save-btn" variant="primary" type="submit">
          Save
        </Button>
      </Form>
      {/* Success Modal */}
      <Modal
        className="modal-container"
        show={showSuccessModal}
        onHide={handleCloseSuccessModal}
      >
        <Modal.Body className="modal-title">
          <p>A new employee was successfully added!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="close-btn"
            variant="secondary"
            onClick={handleCloseSuccessModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreateEmployee;
