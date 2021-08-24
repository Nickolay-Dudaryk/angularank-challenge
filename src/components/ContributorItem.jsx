import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import "./ContributorItem.css";

const ContributorItem = ({
  name,
  id,
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
      <button type="button" onClick={() => router.push(`/contributor/${id}`)}>
        details
      </button>
    </li>
  );
};

ContributorItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  contributions: PropTypes.number.isRequired,
  repositories: PropTypes.number.isRequired,
  gists: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
};

export default ContributorItem;
