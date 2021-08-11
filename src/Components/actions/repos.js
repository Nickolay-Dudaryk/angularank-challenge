import axios from "axios";
import {
  setIsFetching,
  setRepos,
  setContributors,
} from "../../reducers/reposReduser";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;

const perPage = 4;

export const fetchRepos = () => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));

      const { data } = await axios.get(
        `https://api.github.com/orgs/angular/repos?per_page=${perPage}&page=1`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        }
      );

      dispatch(setRepos(data));
    } catch (err) {
      console.log(`fetchRepos error: ${err}`);
    }
  };
};

export const fetchContributors = (repositories) => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));

      repositories.map(async (repository) => {
        const { data } = await axios.get(
          `${repository.contributors_url}?per_page=${perPage}&page=1`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          }
        );

        data.forEach(async (el) => {
          const { data } = await axios.get(
            `https://api.github.com/users/${el.login}`
          );

          dispatch(
            setContributors({
              ...el,
              ...data,
            })
          );
        });
      });
    } catch (err) {
      console.log(`fetchContributors error: ${err}`);
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
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        }
      );
      repos.push(...data);
      end = !!data.length;
    } while (end);
    console.log(repos);
    return repos;
  } catch (err) {
    console.log(`fetchUserRepos error: ${err}`);
  }
};

export const fetchUserReposContributors = async (userLogin, repoName) => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/repos/${userLogin}/${repoName}/contributors`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    return await data;
  } catch (err) {
    console.log(`fetchUserReposContributors error: ${err}`);
  }
};

// FETCH ALL ITEMS FROM API

// const repos = [];
// let i = 0;
// let end = false;

// do {
//   i++;
//   const { data } = await axios.get(
//     `https://api.github.com/orgs/angular/repos?per_page=${perPage}&page=${i}`,
//     {
//       headers: {
//         Authorization: `token ${GITHUB_TOKEN}`,
//       },
//     }
//   );
//   repos.push(...data);
//   end = !!data.length;
// } while (end);

// dispatch(setRepos(repos));
