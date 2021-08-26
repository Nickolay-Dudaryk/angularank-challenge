import React, { memo } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import ContributorItem from "./ContributorItem";
import sortingArr from "../helper";

const ContributorList = memo(
  ({
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
        {arr.map((contributor) => {
          const {
            id,
            login: name,
            contributions,
            repos,
            gists,
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
        <button
          type="button"
          style={{ margin: "0 auto" }}
          onClick={() => loadMoreBtnHandleClick()}
        >
          Load more
        </button>
      </ul>
    );
  },
  (prevProps, nextProps) => prevProps.contributors === nextProps.contributors
);

ContributorList.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  contributors: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadMoreBtnHandleClick: PropTypes.func.isRequired,
  amountOfAllRepos: PropTypes.number.isRequired,
  amountFetchedRepos: PropTypes.number.isRequired,
};

export default ContributorList;
