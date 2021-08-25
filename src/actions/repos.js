/* eslint-disable no-await-in-loop */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import axios from "axios";

import {
  setRepos,
  setContributors,
  setContributorsData,
} from "../reducers/reposReduser";
import { headers } from "../constants";

const perPage = 10;

export const fetchRepos = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/orgs/angular/repos?per_page=${perPage}&page=1`,
      {
        headers,
      }
    );

    const reposArr = [];

    for (let i = 0; i < data.length; i += 1) {
      const isLastIteration = i === data.length - 1;
      const { id, name, contributors_url: url } = data[i];

      reposArr.push({
        id,
        name,
        url,
      });

      if (isLastIteration) {
        dispatch(setRepos(reposArr));
      }
    }
  } catch (err) {
    console.error(`fetchRepos error: ${err.message}`);
  }
};

export const fetchContributors = (repositories) => async (dispatch) => {
  try {
    const contributorsArr = [];

    for (let i = 0; i < repositories.length; i += 1) {
      const { url } = repositories[i];
      const isLastIteration = i === repositories.length - 1;

      const { data } = await axios.get(`${url}?per_page=${perPage}&page=1`, {
        headers,
      });

      data.forEach((el) => {
        const { id, login, contributions } = el;
        const contributor = contributorsArr.find((item) => item.id === id);

        if (contributor) {
          contributor.contributions += contributions;
        } else {
          contributorsArr.push({
            login,
            id,
            contributions,
          });
        }
      });

      if (isLastIteration) {
        dispatch(setContributors(contributorsArr));
      }
    }
  } catch (err) {
    console.error(`fetchContributors error: ${err.message}`);
  }
};

export const fetchContributorsData = (contributors) => async (dispatch) => {
  try {
    const contrDataArr = [];

    for (let i = 0; i < contributors.length; i += 1) {
      const { id, login, contributions } = contributors[i];
      const { data } = await axios.get(
        `https://api.github.com/users/${login}`,
        {
          headers,
        }
      );
      const { followers, public_gists: gists, public_repos: repos } = data;
      const isLastIteration = i === contributors.length - 1;

      contrDataArr.push({
        id,
        login,
        contributions,
        followers,
        gists,
        repos,
      });

      if (isLastIteration) {
        dispatch(setContributorsData(contrDataArr));
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
        `https://api.github.com/users/${userLogin}/repos?per_page=100&page=${i}`,
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
        `https://api.github.com/repos/${userLogin}/${repoName}/contributors?per_page=100&page=${i}`,
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
