import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchContributors, fetchRepos} from "../actions/repos";
import ContributorList from "../components/ContributorList";
import SingleSelect from "../components/SingleSelect";

const Contributors = () => {
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

  const renderContributors = () => {
    // TODO: find out why so much function calls going
    console.log("renderContributors");
    return (
      <ContributorList
        isFetching={isFetching}
        selectedOption={selectedOption}
        contributors={contributors}
      />
    );
  };

  return (
    <div className="app">
      <p>Contributors</p>

      <SingleSelect
        selectedOption={selectedOption}
        handleChange={handleChange}
      />

      {isFetching ? <p>Loading...</p> : renderContributors()}
    </div>
  );
};

export default Contributors;
