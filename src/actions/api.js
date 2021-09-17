/* eslint-disable no-await-in-loop */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import axios from "axios";
import {
  setAmountOfAllRepos,
  setRepos,
  setContributors,
  setContributorsData,
  setIsFetching,
} from "../reducers/apiReducer";
import { headers, perPage } from "../constants";

export const getReposAmount = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://api.github.com/orgs/angular`, {
      headers,
    });

    const { public_repos: amount } = data;

    dispatch(setAmountOfAllRepos(amount));
  } catch (err) {
    console.error(`getReposAmount error: ${err}`);
  }
};

export const fetchRepos = (amountFetchedRepos) => async (dispatch) => {
  try {
    dispatch(setIsFetching(true));

    const { data: repository } = await axios.get(
      `https://api.github.com/orgs/angular/repos?per_page=1&page=${amountFetchedRepos}`,
      {
        headers,
      }
    );

    const { id, name, contributors_url: url } = repository[0];

    dispatch(setRepos({ id, name, url }));
  } catch (err) {
    console.error(`fetchRepos error: ${err.message}`);
  }
};

export const fetchContributors = (repo, contribArr) => async (dispatch) => {
  try {
    const contributorsArr = contribArr ? [...contribArr] : [];

    const { data: contributors } = await axios.get(
      `${repo.url}?per_page=${perPage}&page=1`,
      {
        headers,
      }
    );

    for (let i = 0; i < contributors.length; i += 1) {
      const isLastIteration = i === contributors.length - 1;
      const { id, login, contributions } = contributors[i];
      const existingContributor = contributorsArr.find(
        (item) => item.id === id
      );

      if (existingContributor) {
        existingContributor.contributions += contributions;
      } else {
        contributorsArr.push({ id, login, contributions });
      }

      if (isLastIteration) {
        dispatch(setContributors(contributorsArr));
      }
    }
  } catch (err) {
    console.error(`fetchContributors error: ${err.message}`);
  }
};

export const fetchContributorsData =
  (contributors, contributorsData) => async (dispatch) => {
    try {
      const contrDataArr = contributorsData ? [...contributorsData] : [];

      for (let i = 0; i < contributors.length; i += 1) {
        const { id, login, contributions } = contributors[i];
        const isLastIteration = i === contributors.length - 1;
        const contributor = contrDataArr.find((item) => item.id === id);

        if (!contributor) {
          const { data } = await axios.get(
            `https://api.github.com/users/${login}`,
            {
              headers,
            }
          );

          const { followers, public_gists: gists, public_repos: repos } = data;

          contrDataArr.push({
            id,
            login,
            contributions,
            followers,
            gists,
            repos,
          });
        }

        if (isLastIteration) {
          dispatch(setContributorsData(contrDataArr));
          dispatch(setIsFetching(false));
        }
      }
    } catch (err) {
      console.error(`fetchContributorsData error: ${err.message}`);
    }
  };

export const fetchUserRepos = async (userLogin) => {
  try {
    const repos = [];
    let i = 0;
    let end = false;

    do {
      i += 1;
      const { data } = await axios.get(
        `https://api.github.com/users/${userLogin}/repos?per_page=${perPage}&page=${i}`,
        {
          headers,
        }
      );
      repos.push(...data);
      end = !!data.length;
    } while (end);

    return repos;
  } catch (err) {
    console.error(`fetchUserRepos error: ${err.message}`);
    return undefined;
  }
};

export const fetchUserReposContributors = async (userLogin, repoName) => {
  try {
    const repoContributors = [];
    let i = 0;
    let end = false;

    do {
      i += 1;
      const { data } = await axios.get(
        `https://api.github.com/repos/${userLogin}/${repoName}/contributors?per_page=${perPage}&page=${i}`,
        {
          headers,
        }
      );
      repoContributors.push(...data);
      end = !!data.length;
    } while (end);

    return repoContributors;
  } catch (err) {
    console.error(`fetchUserReposContributors error: ${err.message}`);
    return undefined;
  }
};
