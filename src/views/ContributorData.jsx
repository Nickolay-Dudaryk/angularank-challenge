import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { fetchUserRepos } from "../actions/api";
import RepositoriesList from "../components/RepositoriesList";

const ContributorData = () => {
  const params = useParams();
  const contributors = useSelector((state) => state.repos.contributors);
  const contributor =
    contributors.find((item) => item.id === +params.id) || null;

  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useHistory();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      if (contributor) {
        const data = await fetchUserRepos(contributor.login);

        setRepos(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    })();
  }, [contributor]);

  return (
    <>
      {contributor ? (
        <div>
          <h2>{`Repositories were ${contributor.login} contributed`}</h2>
          <button type="button" onClick={router.goBack}>
            Go back to contributors
          </button>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <RepositoriesList contributor={contributor} repos={repos} />
          )}
        </div>
      ) : (
        <Redirect to="/error" />
      )}
    </>
  );
};

export default ContributorData;
