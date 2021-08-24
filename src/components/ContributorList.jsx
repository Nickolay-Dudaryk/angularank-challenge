import React from "react";
import { nanoid } from "nanoid";
import ContributorItem from "./ContributorItem";
import { sortingArr } from "../helper";

const ContributorList = ({ selectedOption, contributors }) => {
  const arr = sortingArr(contributors, selectedOption);

  return (
    <ul className="contributors-list">
      {arr.map((contributor) => (
        <ContributorItem
          key={nanoid()}
          id={contributor.id}
          name={contributor.login}
          contributions={contributor.contributions}
          repositories={contributor.repos}
          gists={contributor.gists}
          followers={contributor.followers}
        />
      ))}
    </ul>
  );
};

export default ContributorList;
