import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";
import LinkBtn from "./LinkBtn";

const RepositoriesList = ({ contributor, repos }) => {
  const router = useHistory();

  const handleClick = (id, name) => {
    router.push({
      pathname: `/repository/${id}`,
      state: { user: contributor.login, repo: name },
    });
  };

  return (
    <ul className="contributors-list">
      {repos.map((el) => {
        const { id, name, html_url: url } = el;

        return (
          <li className="contributor-item" key={nanoid()}>
            Repository name:
            {name}
            <LinkBtn url={url} title="Repo Link" />
            <button type="button" onClick={() => handleClick(id, name)}>
              details
            </button>
          </li>
        );
      })}
    </ul>
  );
};

RepositoriesList.propTypes = {
  contributor: PropTypes.shape({
    login: PropTypes.string,
  }).isRequired,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      html_url: PropTypes.string,
    })
  ).isRequired,
};

export default RepositoriesList;
