import React from 'react';
import './ContributorItem.css';

const ContributorItem = ({ name, contributions, followers, repositories, gists }) => {
  return (
    <li className="contributor-item">
      <span>Name: {name}</span>
      <span>Contributions: {contributions}</span>
      <span>Followers: {followers}</span>
      <span>Repositories: {repositories}</span>
      <span>Gists: {gists}</span>

      <button type='button'>details</button>
    </li>
  )
}

export default ContributorItem;
