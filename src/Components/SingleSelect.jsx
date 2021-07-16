import React from 'react';

const SingleSelect = ({ selectedOption, handleChange }) => {
  return (
    <label>
      Sort by
      <select value={selectedOption.value} onChange={handleChange}>
        <option value="contributions">Contributions</option>
        <option value="followers">Followers</option>
        <option value="repositories">Repositories</option>
        <option value="gists">Gists</option>
      </select>
    </label>
  );
}

export default SingleSelect;
