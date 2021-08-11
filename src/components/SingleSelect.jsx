import React from "react";
import {nanoid} from "nanoid";

const options = [
  {value: "contributions", label: "Contributions"},
  {value: "public_repos", label: "Repositories"},
  {value: "public_gists", label: "Gists"},
  {value: "followers", label: "Followers"},
  {value: "login", label: "Name"},
];

const SingleSelect = ({selectedOption, handleChange}) => {
  const optionsArray = options.map(({value, label}) => (
    <option value={value} key={nanoid()}>{label}</option>
  ));

  return (
    <label>
      Sort by
      <select value={selectedOption.value} onChange={handleChange}>
        {optionsArray}
      </select>
    </label>
  );
};

export default SingleSelect;
