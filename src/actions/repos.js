import axios from "axios";
import {
  setIsFetching,
  setRepos,
  setContributors,
  setContributorsData,
} from "../reducers/reposReduser";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;

const perPage = 10;

export const fetchRepos = () => {
  return async (dispatch) => {
    try {
      // dispatch(setIsFetching(true));

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
      console.log(`fetchRepos error: ${err.message}`);
    }
  };
};

export const fetchContributors = (repositories) => {
  return async (dispatch) => {
    try {
      // dispatch(setIsFetching(true));
      const contributorsArr = [];

      for (let i = 0; i < repositories.length; i++) {
        const { contributors_url } = repositories[i];
        const isLastIteration = i === repositories.length - 1;

        const { data } = await axios.get(
            `${contributors_url}?per_page=${perPage}&page=1`,
            {
              headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
              },
            }
        );
        // console.log(data)
        contributorsArr.push(data);

        if (isLastIteration) {
          dispatch(setContributors(...contributorsArr));
        }
      }

      // for (const repository of repositories) {
      //   const { contributors_url } = repository;
      //
      //   const { data } = await axios.get(
      //     `${contributors_url}?per_page=${perPage}&page=1`,
      //     {
      //       headers: {
      //         Authorization: `token ${GITHUB_TOKEN}`,
      //       },
      //     }
      //   );
      //   // console.log(data)
      //   dispatch(setContributors([...data]));
      // }
    } catch (err) {
      console.log(`fetchContributors error: ${err.message}`);
    }
  };
};

export const fetchContributorsData = (contributors) => {
  return async (dispatch) => {
    try {
      // dispatch(setIsFetching(true));
      const contrDataArr = [];

      for (let i = 0; i < contributors.length; i++) {
        const { id, login, contributions } = contributors[i];
        console.log(login)
        const { data } = await axios.get(
          `https://api.github.com/users/${login}`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          }
        );
        const { followers, public_gists: gists, public_repos: repos } = data;
        const isLastIteration = i === contributors.length - 1;
        const contributor = contrDataArr.find((item) => item.id === id);
        console.log(isLastIteration, contributor);

        if (!contributor) {
          contrDataArr.push({
            id: id,
            login: login,
            contributions: contributions,
            followers: followers,
            gists: gists,
            repos: repos,
          });
        } else {
          contributor.contributions += contributions;
        }

        if (isLastIteration) {
          dispatch(setContributorsData(contrDataArr));
          dispatch(setIsFetching(false));
        }
      }
    } catch (err) {
      console.log(`fetchContributorsData error: ${err.message}`);
    }
  };
};

// export const fetchContributors = (repositories) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setIsFetching(true));

//       const contribData = [];

//       repositories.forEach(async (repository) => {
//         const { data } = await axios.get(
//           `${repository.contributors_url}?per_page=${perPage}&page=1`,
//           {
//             headers: {
//               Authorization: `token ${GITHUB_TOKEN}`,
//             },
//           }
//         );

//         console.log(data);

//         data.forEach(async (el) => {
//           const { data } = await axios.get(
//             `https://api.github.com/users/${el.login}`,
//             {
//               headers: {
//                 Authorization: `token ${GITHUB_TOKEN}`,
//               },
//             }
//           );

//           const contributor = contribData.find((item) => item.id === el.id);

//           if (!contributor) {
//             contribData.push({
//               id: el.id,
//               login: el.login,
//               contributions: el.contributions,
//               followers: data.followers,
//               gists: data.public_gists,
//               repos: data.public_repos,
//             });
//           } else {
//             contributor.contributions += el.contributions;
//           }
//         });
//       });
//       console.log(contribData.length);

//       contribData.length && dispatch(setContributors(contribData));
//     } catch (err) {
//       console.log(`fetchContributors error: ${err.message}`);
//     }
//   };
// };

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
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
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
