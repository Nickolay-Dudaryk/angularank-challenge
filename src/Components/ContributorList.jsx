import React from "react";
import { nanoid } from "nanoid";
import ContributorItem from "./ContributorItem";

const ContributorList = ({ selectedOption, contributors }) => {
  console.log(selectedOption, contributors[0]);
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
            name={contributor.login}
            contributions={contributor.contributions}
            repositories={contributor.public_repos}
            gists={contributor.public_gists}
            followers={contributor.followers}
          />
        ))}
    </ul>
  );
};

export default ContributorList;
