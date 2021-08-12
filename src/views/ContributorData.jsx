import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { fetchUserRepos } from "../actions/repos";
import { nanoid } from "nanoid";

const ContributorData = () => {
  const params = useParams();
  const contributors = useSelector((state) => state.repos.contributors);
  const contributor = contributors.find((item) => item.id === +params.id);

  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useHistory();

  useEffect(() => {
    setIsLoading(true);

    const repoData = async () => {
      const data = await fetchUserRepos(contributor.login);

      setRepos(data);
      setIsLoading(false);
    };

    contributor && repoData();
  }, [contributor]);

  return (
    <>
      {contributor ? (
        <div>
          <h2>Repositories were {contributor.login} contributed</h2>
          <button onClick={router.goBack}>Go back to contributors</button>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="contributors-list">
              {repos.map((el) => {
                return (
                  <li className="contributor-item" key={nanoid()}>
                    Repository name: {el.name}
                    <button
                      onClick={() =>
                        router.push({
                          pathname: `/repository/${el.id}`,
                          state: { user: contributor.login, repo: el.name },
                        })
                      }
                    >
                      details
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <Redirect to="/error" />
      )}
    </>
  );
};

export default ContributorData;

// TODO: ul => new separate component
