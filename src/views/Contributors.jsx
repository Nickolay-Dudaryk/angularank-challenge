import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // getReposAmount,
  fetchContributors,
  fetchContributorsData,
  fetchRepos,
} from "../actions/api";
import ContributorList from "../components/ContributorList";
import SingleSelect from "../components/SingleSelect";
import { headers } from "../constants";

const Contributors = () => {
  const dispatch = useDispatch();

  const repositories = useSelector((state) => state.githubApi.repositories);
  const contributors = useSelector((state) => state.githubApi.contributors);
  const contributorsData = useSelector(
    (state) => state.githubApi.contributorsData
  );
  const isFetching = useSelector((state) => state.githubApi.isFetching);

  const [selectedOption, setSelectedOption] = useState("contributions");
  const [amountOfAllRepos, setAmountOfAllRepos] = useState(null);
  const [amountFetchedRepos, setAmountFetchedRepos] = useState(1);

  const handleChange = (e) => setSelectedOption(e.target.value);

  const getRepositoriesAmount = useCallback(async () => {
    const { data } = await axios.get(`https://api.github.com/orgs/angular`, {
      headers,
    });

    const { public_repos: amount } = data;

    return amount;
  });

  useEffect(() => {
    if (!amountOfAllRepos) {
      console.log(amountOfAllRepos);
      console.log(`getReposAmount is working`);
      // (async () => {
      //   setAmountOfAllRepos(await getReposAmount());
      // })();
      setAmountOfAllRepos(getRepositoriesAmount());
    }
  }, [getRepositoriesAmount]);

  React.useMemo(() => {
    console.log(amountOfAllRepos);
    console.log(amountFetchedRepos);
    dispatch(fetchRepos(amountFetchedRepos));
  }, [amountFetchedRepos]);

  React.useMemo(() => {
    dispatch(fetchContributors(repositories));
  }, [repositories]);

  React.useMemo(() => {
    dispatch(fetchContributorsData(contributors));
  }, [contributors]);

  const loadMoreBtnHandleClick = () => {
    setAmountFetchedRepos((prev) => prev + 1);
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
          contributors={contributorsData}
          loadMoreBtnHandleClick={loadMoreBtnHandleClick}
          amountOfAllRepos={amountOfAllRepos}
          amountFetchedRepos={amountFetchedRepos}
        />
      )}
    </div>
  );
};

export default Contributors;
