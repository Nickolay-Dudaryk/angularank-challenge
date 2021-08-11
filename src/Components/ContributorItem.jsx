import React from 'react';
import './ContributorItem.css';

const ContributorItem = ({ name, contributions, repositories, gists, followers }) => {
  return (
    <li className="contributor-item">
      <span>Name: {name}</span>
      <span>Contributions: {contributions}</span>
      <span>Repositories: {repositories}</span>
      <span>Gists: {gists}</span>
      <span>Followers: {followers}</span>
      <button type='button' onClick={() => alert(`${name} contributor details`)}>details</button>
    </li>
  )
}

export default ContributorItem;
