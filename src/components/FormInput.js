import React from "react";
import { Row, Form } from "react-bootstrap";

const FormInput = React.memo(
  ({ label, value, onChange, isInvalid, ...props }) => (
    <Row>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          className={`input-placeholder ${isInvalid ? "is-invalid" : ""}`}
          value={value}
          onChange={onChange}
          {...props}
          autoComplete="off"
        />
        {isInvalid && <div className="invalid-feedback">{isInvalid}</div>}
      </Form.Group>
    </Row>
  )
);

export default FormInput;
