const sortingArr = (arr, sortingOption) =>
  [...arr].sort((a, b) =>
    sortingOption === "login"
      ? a[sortingOption]
          .toLowerCase()
          .localeCompare(b[sortingOption].toLowerCase())
      : b[sortingOption] - a[sortingOption]
  );

export default sortingArr;
