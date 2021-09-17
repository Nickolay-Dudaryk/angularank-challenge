import dotenv from "dotenv";

dotenv.config();

export const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;
export const headers = { Authorization: `token ${GITHUB_TOKEN}` };

export const sortingOptions = [
  { value: "contributions", label: "Contributions" },
  { value: "repos", label: "Repositories" },
  { value: "gists", label: "Gists" },
  { value: "followers", label: "Followers" },
  { value: "login", label: "Name" },
];

export const perPage = 2;
