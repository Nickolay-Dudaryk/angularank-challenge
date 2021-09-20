import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import ContributorItem from "./ContributorItem";
import { sortingArr } from "../helper";

const ContributorList = ({
  selectedOption,
  contributors,
  loadMoreBtnHandleClick,
  amountOfAllRepos,
  amountFetchedRepos,
}) => {
  const arr = sortingArr(contributors, selectedOption);

  return (
    <ul className="contributors-list">
      <p>{`Contributors for ${amountFetchedRepos} of ${amountOfAllRepos} repositories`}</p>
      <button
        type="button"
        disabled={amountFetchedRepos === amountOfAllRepos}
        className="load-more-btn"
        onClick={() => loadMoreBtnHandleClick()}
      >
        Load more
      </button>
      {arr.map((contributor) => {
        const {
          id,
          login: name,
          contributions,
          public_repos: repos,
          public_gists: gists,
          followers,
        } = contributor;
        return (
          <ContributorItem
            key={nanoid()}
            id={id}
            name={name}
            contributions={contributions}
            repositories={repos}
            gists={gists}
            followers={followers}
          />
        );
      })}
    </ul>
  );
};

ContributorList.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  contributors: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadMoreBtnHandleClick: PropTypes.func.isRequired,
  amountOfAllRepos: PropTypes.number.isRequired,
  amountFetchedRepos: PropTypes.number.isRequired,
};

export default ContributorList;
