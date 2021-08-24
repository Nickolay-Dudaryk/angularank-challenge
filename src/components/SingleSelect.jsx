import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { sortingOptions } from "../constants";

const SingleSelect = ({ selectedOption, handleChange }) => {
  const optionsArray = sortingOptions.map(({ value, label }) => (
    <option value={value} key={nanoid()}>
      {label}
    </option>
  ));

  return (
    <label htmlFor="select">
      Sort by
      <select id="select" value={selectedOption} onChange={handleChange}>
        {optionsArray}
      </select>
    </label>
  );
};

SingleSelect.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SingleSelect;
