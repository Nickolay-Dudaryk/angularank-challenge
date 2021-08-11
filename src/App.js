import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContributors, fetchRepos } from "./Components/actions/repos";
import { nanoid } from "nanoid";
import ContributorItem from "./Components/ContributorItem";
import SingleSelect from "./Components/SingleSelect";

const App = () => {
  const dispatch = useDispatch();

  const repositories = useSelector((state) => state.repos.repositories);
  const contributors = useSelector((state) => state.repos.contributors);
  const isFetching = useSelector((state) => state.repos.isFetching);

  const [selectedOption, setSelectedOption] = useState("contributions");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);

    renderContributors();
  };

  useEffect(() => {
    dispatch(fetchRepos());
  }, []);

  useEffect(() => {
    dispatch(fetchContributors(repositories));
  }, [repositories]);

  useEffect(() => {
    renderContributors();
  }, [contributors]);

  const renderContributors = () => {
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
          .map((el) => (
            <ContributorItem
              key={nanoid()}
              name={el.login}
              contributions={el.contributions}
              repositories={el.public_repos}
              gists={el.public_gists}
              followers={el.followers}
            />
          ))}
      </ul>
    );
  };

  return (
    <div className="app">
      {isFetching ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <p>Contributors</p>
          <SingleSelect
            selectedOption={selectedOption}
            handleChange={handleChange}
          />

          {renderContributors()}
        </>
      )}
    </div>
  );
};

export default App;
