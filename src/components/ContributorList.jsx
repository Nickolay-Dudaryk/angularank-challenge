import React from "react";
import { nanoid } from "nanoid";
import ContributorItem from "./ContributorItem";

const ContributorList = ({ selectedOption, contributors }) => {
  return (
    <ul className="contributors-list">
      {[...contributors]
        .sort((a, b) =>
          selectedOption === "login"
            ? a[selectedOption]
                .toLowerCase()
                .localeCompare(b[selectedOption].toLowerCase())
            : b[selectedOption] - a[selectedOption]
        )
        .map((contributor) => (
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
