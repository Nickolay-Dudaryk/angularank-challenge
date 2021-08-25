import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContributors,
  fetchContributorsData,
  fetchRepos,
} from "../actions/api";
import ContributorList from "../components/ContributorList";
import SingleSelect from "../components/SingleSelect";

const Contributors = () => {
  const dispatch = useDispatch();

  const repositories = useSelector((state) => state.githubApi.repositories);
  const contributors = useSelector((state) => state.githubApi.contributors);
  const contributorsData = useSelector(
    (state) => state.githubApi.contributorsData
  );
  const isFetching = useSelector((state) => state.githubApi.isFetching);

  const [selectedOption, setSelectedOption] = useState("contributions");

  const handleChange = (e) => setSelectedOption(e.target.value);

  useEffect(() => {
    if (repositories.length < 1) {
      dispatch(fetchRepos());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchContributors(repositories));
  }, [repositories]);

  useEffect(() => {
    dispatch(fetchContributorsData(contributors));
  }, [contributors]);

  return (
    <div className="app">
      <p>Contributors</p>

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
        />
      )}
    </div>
  );
};

export default Contributors;
