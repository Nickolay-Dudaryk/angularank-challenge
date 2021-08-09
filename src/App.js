import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchContributors, fetchRepos, getReposAmount } from "./Components/actions/repos";
import { nanoid } from "nanoid";
import ContributorItem from "./Components/ContributorItem";
import SingleSelect from "./Components/SingleSelect";

const App = () => {
  const dispatch = useDispatch();

  const repositories = useSelector((state) => state.repos.repositories);
  const contributors = useSelector((state) => state.repos.contributors);
  const isFetching = useSelector((state) => state.repos.isFetching);

  const [selectedOption, setSelectedOption] = React.useState({
    value: "contributions",
  });
  const [reposAmount, setReposAmount] = React.useState(0);
  
  const handleChange = (e) => {
    setSelectedOption({ value: e.target.value });
    renderContributors();
  };
  
  React.useEffect(() => {
    const fn = async() => {
      setReposAmount(await getReposAmount());
    };
    fn();
  }, []);

  React.useEffect(() => {
    const fn = async() => {
      dispatch(fetchRepos(reposAmount));
    };
    fn();
  }, [reposAmount]);

  // React.useEffect(() => {
  //   const fn = async() => {
  //     dispatch(fetchContributors(repositories));
  //   };
  //   fn();
  // }, []);


  const renderContributors = () => {
    return (
      <ul className="contributors-list">
        {contributors
          .sort((a, b) => b[selectedOption.value] - a[selectedOption.value])
          .map((el) => (
            <ContributorItem
              key={nanoid()}
              name={el.login}
              contributions={el.contributions}
              followers={el.followers_amount}
              repositories={el.repos_amount}
              gists={el.gists_amount}
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
