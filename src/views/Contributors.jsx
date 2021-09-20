import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReposAmount, fetchContributors, fetchRepos } from "../actions/api";
import ContributorList from "../components/ContributorList";
import SingleSelect from "../components/SingleSelect";

const Contributors = () => {
  const dispatch = useDispatch();

  const amountOfAllRepos = useSelector(
    (state) => state.githubApi.amountOfAllRepos
  );
  const repositories = useSelector((state) => state.githubApi.repositories);
  const contributors = useSelector((state) => state.githubApi.contributors);
  const isFetching = useSelector((state) => state.githubApi.isFetching);

  const [selectedOption, setSelectedOption] = useState("contributions");
  const [amountFetchedRepos, setAmountFetchedRepos] = useState(1);

  const handleChange = (e) => setSelectedOption(e.target.value);

  useEffect(() => {
    if (amountOfAllRepos < 1) {
      dispatch(getReposAmount());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchRepos(amountFetchedRepos));
  }, [amountFetchedRepos]);

  useEffect(() => {
    if (repositories.length > 0) {
      const lastRepo = repositories[repositories.length - 1];
      dispatch(fetchContributors(lastRepo, contributors || []));
    }
  }, [repositories]);

  const loadMoreBtnHandleClick = () => {
    if (amountFetchedRepos <= amountOfAllRepos) {
      setAmountFetchedRepos((prev) => prev + 1);
    }
  };

  return (
    <div className="app">
      <p>Contributors page</p>

      <SingleSelect
        selectedOption={selectedOption}
        handleChange={handleChange}
      />

      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <ContributorList
          selectedOption={selectedOption}
          contributors={contributors}
          loadMoreBtnHandleClick={loadMoreBtnHandleClick}
          amountOfAllRepos={amountOfAllRepos}
          amountFetchedRepos={amountFetchedRepos}
        />
      )}
    </div>
  );
};

export default Contributors;
