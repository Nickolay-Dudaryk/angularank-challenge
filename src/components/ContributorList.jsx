import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import ContributorItem from "./ContributorItem";
import sortingArr from "../helper";

const ContributorList = ({ selectedOption, contributors }) => {
  const arr = sortingArr(contributors, selectedOption);

  return (
    <ul className="contributors-list">
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
    </ul>
  );
};

ContributorList.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  contributors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ContributorList;
