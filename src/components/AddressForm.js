import React from "react";
import { Form } from "react-bootstrap";

const AddressForm = ({
  street,
  setStreet,
  city,
  setCity,
  state,
  setState,
  zipCode,
  setZipCode,
  formErrors,
  statesData,
}) => (
  <Form.Group className="form-group" id="address">
    <Form.Label>Address</Form.Label>
    <Form.Control
      type="text"
      placeholder="Street"
      value={street}
      onChange={(e) => setStreet(e.target.value)}
      isInvalid={formErrors.street}
    />
    <Form.Control.Feedback type="invalid">
      {formErrors.street}
    </Form.Control.Feedback>
    <Form.Control
      type="text"
      placeholder="City"
      value={city}
      onChange={(e) => setCity(e.target.value)}
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
        onChange={(e) => setState(e.target.value)}
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
        onChange={(e) => setZipCode(e.target.value)}
        isInvalid={formErrors.zipCode}
      />
      <Form.Control.Feedback className="error-address" type="invalid">
        {formErrors.zipCode}
      </Form.Control.Feedback>
    </div>
  </Form.Group>
);

export default AddressForm;
