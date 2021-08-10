import axios from "axios";
import {
  setIsFetching,
  setRepos,
  setContributors,
  setContributorData,
} from "../../reducers/reposReduser";

const perPage = 100;

export const getReposAmount = async () => {
  try {
    const { data } = await axios.get("https://api.github.com/orgs/angular");

    return await data.public_repos;
  } catch (err) {
    console.log(`getReposAmount error: ${err}`);
  }
};

export const fetchRepos = (reposAmount) => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));

      // const repos = [];
      // let i = 0;
      // let end = false;

      // do {
      //   i++;
      //   const { data } = await axios.get(
      //     `https://api.github.com/orgs/angular/repos?per_page=${perPage}&page=${i}`
      //   );
      //   repos.push(...data);
      //   end = !!data.length;
      // } while (end);
      const { data } = await axios.get(
        `https://api.github.com/orgs/angular/repos?per_page=5&page=1`,
        {
          headers: {
            Authorization: "token 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",
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

      // repositories.map(async (repository) => {
      //   const contrib = [];
      //   let i = 0;
      //   let end = false;

      //   do {
      //     i++;
      //     const { data } = await axios.get(
      //       `${repository.contributors_url}?per_page=${perPage}&page=${i}`
      //     );
      //     contrib.push(...data);
      //     end = !!data.length;
      //   } while (end);

      // const contrib = [];

      repositories.map(async (repository) => {
        const { data } = await axios.get(
          `${repository.contributors_url}?per_page=5&page=1`,
          {
            headers: {
              Authorization: "token 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",
            },
          }
        );

        data.forEach(async (el) => {
          const { data } = await axios.get(
            `https://api.github.com/users/${el.login}`
          );

          // console.log(
          //   el,
          //   contributorData.public_repos,
          //   contributorData.public_gists,
          //   contributorData.followers
          // );
          console.log({ ...el, ...data });

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

// export const fetchContributorData = (contributors) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setIsFetching(true));

//       contributors.map(async (contributor) => {
//         const { data } = await axios.get(
//           `https://api.github.com/users/${contributor.login}`,
//           {
//             headers: {
//               Authorization: "token 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",
//             },
//           }
//         );

//         dispatch(setContributorData(data));
//       });
//     } catch (err) {
//       console.log(`fetchContributorData error: ${err}`);
//     }
//   };
// };
