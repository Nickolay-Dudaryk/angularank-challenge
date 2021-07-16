import axios from "axios";
import {
  setIsFetching,
  setRepos,
  setContributors,
} from "../../reducers/reposReduser";

export const fetchRepos = () => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));

      // const headers = {
      //   Authorization: "token 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",
      // };

      const url = "https://api.github.com/orgs/angular/repos?per_page=2";
      const result = await fetch(url);
      const repositoriesData = await result.json();

      dispatch(setRepos(repositoriesData));

      await Promise.all(
        repositoriesData.map(async (repository) => {
          const url = `${repository.contributors_url}?per_page=1`;
          const result = await fetch(url);
          const contributorData = await result.json();

          await Promise.all(
            contributorData.map(async (contributor) => {
              const urlFollowers = `${contributor.followers_url}?per_page=100`;
              const urlGists = `https://api.github.com/users/${contributor.login}/gists?per_page=100`;
              const urlRepos = `${contributor.repos_url}?per_page=100`;

              const results = await Promise.all([
                fetch(urlFollowers),
                fetch(urlGists),
                fetch(urlRepos),
              ]);

              const dataPromises = await results.map((el) => el.json());
              const contributorDetails = await Promise.all(dataPromises);

              contributor.followers_amount = contributorDetails[0].length;
              contributor.gists_amount = contributorDetails[1].length;
              contributor.repos_amount = contributorDetails[2].length;

              dispatch(setContributors(contributorData));
            })
          );
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};
