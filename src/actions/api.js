/* eslint-disable no-await-in-loop */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import axios from "axios";
import {
  setAmountOfAllRepos,
  setRepos,
  setContributors,
  setIsFetching,
} from "../reducers/apiReducer";
import { headers, perPage } from "../constants";
import { fetchData, mergeDuplicatesContributions, promiseAll } from "../helper";

export const getReposAmount = () => async (dispatch) => {
  try {
    const { public_repos: amount } = await fetchData(
      `https://api.github.com/orgs/angular`
    );

    dispatch(setAmountOfAllRepos(amount));
  } catch (err) {
    console.error(`getReposAmount error: ${err}`);
  }
};

export const fetchRepos = (amountFetchedRepos) => async (dispatch) => {
  try {
    dispatch(setIsFetching(true));

    const repository = await fetchData(
      `https://api.github.com/orgs/angular/repos?per_page=1&page=${amountFetchedRepos}`
    );

    const { id, name, contributors_url: url } = repository[0];

    dispatch(setRepos({ id, name, url }));
  } catch (err) {
    console.error(`fetchRepos error: ${err.message}`);
  }
};

export const fetchContributors = (repo, contribArr) => async (dispatch) => {
  try {
    const contributorsOld = contribArr ? [...contribArr] : [];

    const contributorsNew = await fetchData(
      `${repo.url}?per_page=${perPage}&page=1`
    );

    const uniqueContributors = mergeDuplicatesContributions([
      ...contributorsNew,
      ...contributorsOld,
    ]);

    const contributorsData = await promiseAll(uniqueContributors);

    uniqueContributors.forEach((el) => {
      const contributor = contributorsData.find((item) => item.id === el.id);

      if (contributor) {
        contributor.contributions = el.contributions;
      }
    });

    dispatch(setContributors(contributorsData));
    dispatch(setIsFetching(false));
  } catch (err) {
    console.error(`fetchContributors error: ${err.message}`);
  }
};

export const fetchUserRepos = async (userLogin, reposAmount) => {
  try {
    const queriesCount = Math.ceil(reposAmount / perPage);
    const promisesArr = [];

    for (let i = 0; i < queriesCount; i += 1) {
      promisesArr.push({
        id: i,
        url: `https://api.github.com/users/${userLogin}/repos?per_page=${perPage}&page=${i}`,
      });
    }

    const repos = await promiseAll(promisesArr);

    // eslint-disable-next-line no-console
    console.info(repos);
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
