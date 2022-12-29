function FilterDark(classNames) {
  const filtered = classNames
    .split(" ")
    .filter((e) => !e.includes("dark:"))
    .join(" ");

  return filtered;
}

function ClassListRemover(classList) {
  let filter = {};
  for (const key in classList) {
    if (Object.hasOwnProperty.call(classList, key)) {
      const element = classList[key];

      // change md: to dark:
      if (element.includes("md:") === false) {
        filter[key] = element;
      }
    }
  }
  return filter;
}

console.log(
  ClassListRemover({
    0: "object-cover",
    1: "w-full",
    2: "rounded-t-lg",
    3: "h-96",
    4: "md:h-auto",
    5: "md:w-48",
    6: "md:rounded-none",
    7: "md:rounded-l-lg",
  })
);

// console.log(
//   FilterDark(
//     "flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700"
//   )
// );
