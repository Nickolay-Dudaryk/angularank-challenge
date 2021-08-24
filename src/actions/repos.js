import axios from "axios";
import {
  setRepos,
  setContributors,
  setContributorsData,
} from "../reducers/reposReduser";
import { headers } from "../constants";

const perPage = 2;

export const fetchRepos = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/orgs/angular/repos?per_page=${perPage}&page=1`,
        {
          headers: headers,
        }
      );

      const reposArr = [];

      for (let i = 0; i < data.length; i++) {
        const isLastIteration = i === data.length - 1;
        const { id, name, contributors_url } = data[i];

        reposArr.push({
          id: id,
          name: name,
          contributors_url: contributors_url,
        });

        if (isLastIteration) {
          dispatch(setRepos(reposArr));
        }
      }
    } catch (err) {
      console.log(`fetchRepos error: ${err.message}`);
    }
  };
};

export const fetchContributors = (repositories) => {
  return async (dispatch) => {
    try {
      const contributorsArr = [];

      for (let i = 0; i < repositories.length; i++) {
        const { contributors_url: url } = repositories[i];
        const isLastIteration = i === repositories.length - 1;

        const { data } = await axios.get(`${url}?per_page=${perPage}&page=1`, {
          headers: headers,
        });

        data.forEach((el) => {
          const { id, login, contributions } = el;
          const contributor = contributorsArr.find((item) => item.id === id);

          if (contributor) {
            contributor.contributions += contributions;
          } else {
            contributorsArr.push({
              login: login,
              id: id,
              contributions: contributions,
            });
          }
        });

        if (isLastIteration) {
          dispatch(setContributors(contributorsArr));
        }
      }
    } catch (err) {
      console.log(`fetchContributors error: ${err.message}`);
    }
  };
};

export const fetchContributorsData = (contributors) => {
  return async (dispatch) => {
    try {
      const contrDataArr = [];

      for (let i = 0; i < contributors.length; i++) {
        const { id, login, contributions } = contributors[i];
        const { data } = await axios.get(
          `https://api.github.com/users/${login}`,
          {
            headers: headers,
          }
        );
        const { followers, public_gists: gists, public_repos: repos } = data;
        const isLastIteration = i === contributors.length - 1;

        contrDataArr.push({
          id: id,
          login: login,
          contributions: contributions,
          followers: followers,
          gists: gists,
          repos: repos,
        });

        if (isLastIteration) {
          dispatch(setContributorsData(contrDataArr));
        }
      }
    } catch (err) {
      console.log(`fetchContributorsData error: ${err.message}`);
    }
  };
};

export const fetchUserRepos = async (userLogin) => {
  try {
    const repos = [];
    let i = 0;
    let end = false;

    do {
      i++;
      const { data } = await axios.get(
        `https://api.github.com/users/${userLogin}/repos?per_page=100&page=${i}`,
        {
          headers: headers,
        }
      );
      repos.push(...data);
      end = !!data.length;
    } while (end);

    return repos;
  } catch (err) {
    console.log(`fetchUserRepos error: ${err.message}`);
  }
};

export const fetchUserReposContributors = async (userLogin, repoName) => {
  try {
    const repoContributors = [];
    let i = 0;
    let end = false;

    do {
      i++;
      const { data } = await axios.get(
        `https://api.github.com/repos/${userLogin}/${repoName}/contributors?per_page=100&page=${i}`,
        {
          headers: headers,
        }
      );
      repoContributors.push(...data);
      end = !!data.length;
    } while (end);

    return repoContributors;
  } catch (err) {
    console.log(`fetchUserReposContributors error: ${err.message}`);
  }
};
