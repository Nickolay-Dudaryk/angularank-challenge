import { headers } from "./constants";

export function sortingArr(arr, sortingOption) {
  return [...arr].sort((a, b) =>
    sortingOption === "login"
      ? a[sortingOption]
          .toLowerCase()
          .localeCompare(b[sortingOption].toLowerCase())
      : b[sortingOption] - a[sortingOption]
  );
}

export function mergeDuplicatesContributions(arr) {
  const result = [];

  arr.forEach((el) => {
    const idx = result.findIndex((item) => item.id === el.id);
    if (idx === -1) {
      result.push({ ...el });
    } else {
      result[idx].contributions += el.contributions;
    }
  });

  return result;
}

export async function fetchData(url) {
  const response = await fetch(url, {
    headers,
  });
  const data = await response.json();

  return data;
}

export async function promiseAll(arr) {
  const promises = arr.map((i) =>
    fetch(i.url, {
      headers,
    })
  );
  const res = await Promise.all(promises);
  const data = await Promise.all(res.map((i) => i.json()));

  return data;
}
