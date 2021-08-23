import { nanoid } from "nanoid";
import Link from "./Link";
import React from "react";
import { useHistory } from "react-router-dom";

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
            Repository name: {name}
            <Link url={url} title={"Repo Link"} />
            <button onClick={() => handleClick(id, name)}>details</button>
          </li>
        );
      })}
    </ul>
  );
};

export default RepositoriesList;
