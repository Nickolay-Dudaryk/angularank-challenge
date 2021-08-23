import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useHistory, useLocation } from "react-router-dom";
import { fetchUserReposContributors } from "../actions/repos";
import Link from "../components/Link";

const RepositoryData = () => {
  const location = useLocation();
  const { user, repo } = location.state;

  const [contributors, setContributors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useHistory();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await fetchUserReposContributors(user, repo);

      setContributors(data);
      setIsLoading(false);
    })();
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
            const { login, html_url: url } = el;

            return (
              <li className="contributor-item" key={nanoid()}>
                Contributor name: {login}
                <Link url={url} title={"Github link"} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RepositoryData;
