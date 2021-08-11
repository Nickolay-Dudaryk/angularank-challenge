import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./ContributorItem.css";

const ContributorItem = ({
  name,
  contributorId,
  contributions,
  repositories,
  gists,
  followers,
}) => {

  const router = useHistory();

  return (
    <li className="contributor-item">
      <span>Name: {name}</span>
      <span>Contributions: {contributions}</span>
      <span>Repositories: {repositories}</span>
      <span>Gists: {gists}</span>
      <span>Followers: {followers}</span>
      <button onClick={() => router.push(`/contributors/${contributorId}`)}>details</button>
    </li>
  );
};

export default ContributorItem;
