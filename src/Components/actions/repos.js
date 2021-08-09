import axios from "axios";
import {
  setIsFetching,
  setRepos,
  setContributors,
} from "../../reducers/reposReduser";

export const getReposAmount = async () => {
  const { data } =  await(axios.get('https://api.github.com/orgs/angular'));
        
  return (await(data.public_repos));
}


export const fetchRepos = (reposAmount) => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));

      // const headers = {
      //   Authorization: "token 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",
      // };

      const perPage = 100;
      // const countOfQueries = Math.ceil(reposAmount / perPage);
      const repos = [];
      let i = 0;
      let end = false;
      do {
        i++;
        const {data} = await(axios.get(`https://api.github.com/orgs/angular/repos?per_page=${perPage}&page=${i}`));
        repos.push(...data);
        end = !!data.length;
      } while (end);

      // for (let i = 0; i < countOfQueries; i++) {
      //   const {data} = await(axios.get(`https://api.github.com/orgs/angular/repos?per_page=${perPage}&page=${i+1}`));

      //   repos.push(...data);
      // }

      dispatch(setRepos(repos));

    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchContributors = (repositories) => {
  return async(dispatch) => {
    try {
      repositories.map(async (repository) => {
        // const uniqueContributors = [...new Set(contributors.map((el) => el.id))];
    
        const perPage = 100;
        // const countOfQueries = Math.ceil(reposAmount / perPage);
        const contrib = [];
        let i = 0;
        let end = false;
        do {
          i++;
          const {data} = await(axios.get(`${repository.contributors_url}?per_page=${perPage}`));
          contrib.push(...data);
          end = !!data.length;
        } while (end);
    
        // const { data } = axios.get(`${repository.contributors_url}?per_page=100`);
    
        const uniqueContributors = [...new Set(contrib.map((el) => el.id))];
    
        dispatch(setContributors(uniqueContributors))
      })
    } catch(err) {
      console.log(err)
    }
  }
}

export const fetchContributorData = (contributor) => {
  // await Promise.all(
          //   contributorData.map(async (contributor) => {
          //     const urlFollowers = `${contributor.followers_url}?per_page=100`;
          //     const urlGists = `https://api.github.com/users/${contributor.login}/gists?per_page=100`;
          //     const urlRepos = `${contributor.repos_url}?per_page=100`;

          //     const results = await Promise.all([
          //       fetch(urlFollowers),
          //       fetch(urlGists),
          //       fetch(urlRepos),
          //     ]);

          //     const dataPromises = await results.map((el) => el.json());
          //     const contributorDetails = await Promise.all(dataPromises);

          //     contributor.followers_amount = contributorDetails[0].length;
          //     contributor.gists_amount = contributorDetails[1].length;
          //     contributor.repos_amount = contributorDetails[2].length;

          //     dispatch(setContributors(contributorData));
          //   })
          // );
  return null;
}
