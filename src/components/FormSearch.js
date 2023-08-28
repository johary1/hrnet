import React, { useState } from "react";

const FormSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    // handle search logic here
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <div className="mb-3 input-group input-group-sm">
        <span id="search-label" className="input-group-text">
          Search
        </span>
        <input
          placeholder="employees..."
          type="text"
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
