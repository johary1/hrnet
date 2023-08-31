import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerWrapper = ({ selectedDate, onChange, ...optionsList }) => (
  <DatePicker
    dateFormat="dd/MM/yyyy"
    placeholderText="Select a date"
    selected={selectedDate}
    onChange={onChange}
    {...optionsList}
  />
);

export default DatePickerWrapper;
