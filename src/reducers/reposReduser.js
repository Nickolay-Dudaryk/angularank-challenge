const SET_REPOS = "SET_REPOS";
const SET_CONTRIBUTORS = "SET_CONTRIBUTORS";
const SET_CONTRIBUTORS_DATA = "SET_CONTRIBUTORS_DATA";
const SET_IS_FETCHING = "SET_IS_FETCHING";

const defaultState = {
  repositories: [],
  contributors: [],
  contributorsData: [],
  isFetching: true,
};

export default function reposReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_REPOS:
      return {
        ...state,
        repositories: action.payload,
        // isFetching: false,
      };
    case SET_CONTRIBUTORS:
      return {
        ...state,
        contributors: action.payload,
        // isFetching: false,
      };
    case SET_CONTRIBUTORS_DATA:
      return {
        ...state,
        contributorsData: action.payload,
        // isFetching: false,
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

export const setRepos = (repos) => ({ type: SET_REPOS, payload: repos });
export const setContributors = (repos) => ({
  type: SET_CONTRIBUTORS,
  payload: repos,
});
export const setContributorsData = (repos) => ({
  type: SET_CONTRIBUTORS_DATA,
  payload: repos,
});
export const setIsFetching = (bool) => ({
  type: SET_IS_FETCHING,
  payload: bool,
});
