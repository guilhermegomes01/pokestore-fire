const CapitalizeString = (string) => {
  let index = string.indexOf(" ");
  let newString = string?.toLowerCase();
  newString = newString[0]?.toUpperCase() + newString.slice(1);
  while (index > -1) {
    newString =
      newString.slice(0, index + 1) +
      newString[index + 1].toUpperCase() +
      newString.slice(index + 2);
    index = string.indexOf(" ", index + 1);
  }

  return newString;
};

export { CapitalizeString };
