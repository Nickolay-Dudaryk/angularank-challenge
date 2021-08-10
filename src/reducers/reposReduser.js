const SET_REPOS = "SET_REPOS";
const SET_CONTRIBUTORS = "SET_CONTRIBUTORS";
const SET_IS_FETCHING = "SET_IS_FETCHING";

const defaultState = {
  repositories: [],
  contributors: [],
  isFetching: true,
};

export default function reposReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_REPOS:
      return {
        ...state,
        repositories: action.payload,
      };
    case SET_CONTRIBUTORS:
      const newContributors = [...state.contributors];
      const { payload } = action;

      const contributor = newContributors.find(
        (contr) => contr.id === payload.id
      );

      if (!contributor) {
        newContributors.push(payload);
      } else {
        contributor.contributions += payload.contributions;
      }

      return {
        ...state,
        contributors: newContributors,
        isFetching: false,
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
export const setIsFetching = (bool) => ({
  type: SET_IS_FETCHING,
  payload: bool,
});
