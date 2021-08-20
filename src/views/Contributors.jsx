import React, {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContributors,
  fetchContributorsData,
  fetchRepos,
} from "../actions/repos";
import ContributorList from "../components/ContributorList";
import SingleSelect from "../components/SingleSelect";

const Contributors = () => {
  const dispatch = useDispatch();

  const repositories = useSelector((state) => state.repos.repositories);
  const contributors = useSelector((state) => state.repos.contributors);
  const contributorsData = useSelector((state) => state.repos.contributorsData);
  const isFetching = useSelector((state) => state.repos.isFetching);
  const isInitialMount = useRef(true);

  const [selectedOption, setSelectedOption] = useState("contributions");

  const handleChange = (e) => setSelectedOption(e.target.value);

  useEffect(() => {
    dispatch(fetchRepos());
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      dispatch(fetchContributors(repositories));
    }
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
