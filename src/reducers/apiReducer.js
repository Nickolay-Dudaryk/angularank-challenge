const SET_AMOUNT_OF_ALL_REPOS = "SET_AMOUNT_OF_ALL_REPOS";
const SET_REPOS = "SET_REPOS";
const SET_CONTRIBUTORS = "SET_CONTRIBUTORS";
const SET_CONTRIBUTORS_DATA = "SET_CONTRIBUTORS_DATA";
const SET_IS_FETCHING = "SET_IS_FETCHING";

const defaultState = {
  amountOfAllRepos: 0,
  repositories: [],
  contributors: [],
  contributorsData: [],
  isFetching: true,
};

export default function apiReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_AMOUNT_OF_ALL_REPOS:
      return {
        ...state,
        amountOfAllRepos: action.payload,
      };
    case SET_REPOS:
      return {
        ...state,
        repositories:
          state.repositories.length < 1
            ? [action.payload]
            : [...state.repositories, action.payload],
      };
    case SET_CONTRIBUTORS:
      return {
        ...state,
        contributors: [...action.payload],
      };
    case SET_CONTRIBUTORS_DATA:
      return {
        ...state,
        contributorsData: [...action.payload],
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    default:
      return state;
  }
}

export const setAmountOfAllRepos = (number) => ({
  type: SET_AMOUNT_OF_ALL_REPOS,
  payload: number,
});

export const setRepos = (githubApi) => ({
  type: SET_REPOS,
  payload: githubApi,
});

export const setContributors = (githubApi) => ({
  type: SET_CONTRIBUTORS,
  payload: githubApi,
});

export const setContributorsData = (githubApi) => ({
  type: SET_CONTRIBUTORS_DATA,
  payload: githubApi,
});

export const setIsFetching = (bool) => ({
  type: SET_IS_FETCHING,
  payload: bool,
});
