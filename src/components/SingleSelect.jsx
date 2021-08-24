import React from "react";
import { nanoid } from "nanoid";
import { sortingOptions } from "../constants";

const SingleSelect = ({ selectedOption, handleChange }) => {
  const optionsArray = sortingOptions.map(({ value, label }) => (
    <option value={value} key={nanoid()}>
      {label}
    </option>
  ));

  return (
    <label>
      Sort by
      <select value={selectedOption} onChange={handleChange}>
        {optionsArray}
      </select>
    </label>
  );
};

export default SingleSelect;
