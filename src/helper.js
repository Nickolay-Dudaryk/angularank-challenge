export const sortingArr = (arr, sortingOption) => {
  return [...arr].sort((a, b) =>
    sortingOption === "login"
      ? a[sortingOption]
          .toLowerCase()
          .localeCompare(b[sortingOption].toLowerCase())
      : b[sortingOption] - a[sortingOption]
  );
};
