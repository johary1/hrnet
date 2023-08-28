import React from "react";
import { Form } from "react-bootstrap";

const Select = ({ options, ...optionsList }) => (
  <Form.Select {...optionsList}>
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </Form.Select>
);

export default Select;
