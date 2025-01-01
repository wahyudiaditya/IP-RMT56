export const getYear = (date) => {
  return new Date(date).getFullYear();
};

export const formatToDefaultDate = (date) => {
  const getDate = new Date(date);

  const day = String(getDate.getDate()).padStart(2, "0");
  const month = String(getDate.getMonth() + 1).padStart(2, "0");
  const year = getDate.getFullYear();

  return `${day}/${month}/${year}`;
};
