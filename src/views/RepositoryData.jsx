import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { fetchUserReposContributors } from "../actions/repos";

const RepositoryData = () => {
  const location = useLocation();
  const { user, repo } = location.state;

  const [contributors, setContributors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useHistory();

  useEffect(() => {
    setIsLoading(true);

    const contributorsData = async () => {
      const data = await fetchUserReposContributors(user, repo);

      setContributors(data);
      setIsLoading(false);
    };

    contributorsData();
  }, [user, repo]);

  return (
    <div>
      <h2>
        {user} user {repo} repository contributors page
      </h2>
      <button onClick={router.goBack}>Go back to {user} repositories</button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="contributors-list">
          {contributors.map((el) => {
            return (
              <li className="contributor-item" key={nanoid()}>
                Contributor name: {el.login}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RepositoryData;
