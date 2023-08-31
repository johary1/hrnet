import React, { useState } from "react";

const FormSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleSearchTermChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <div className="mb-3 input-group input-group-sm">
        <span id="search-label" className="input-group-text">
          Search
        </span>
        <input
          placeholder="employees..."
          type="search"
          id="inlineFormInputGroup"
          className="form-control"
          value={searchTerm}
          onChange={handleSearchTermChange}
          autoComplete="off"
        />
      </div>
    </form>
  );
};

export default FormSearch;
