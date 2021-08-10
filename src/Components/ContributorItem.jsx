import React from 'react';
import './ContributorItem.css';

const ContributorItem = ({ name, contributions, repositories, gists, followers }) => {
  return (
    <li className="contributor-item">
      <span>Name: {name}</span>
      <span>Contributions: {contributions}</span>
      <span>Repositorises: {repositories}</span>
      <span>Gists: {gists}</span>
      <span>Followers: {followers}</span>
      <button type='button'>details</button>
    </li>
  )
}

export default ContributorItem;
