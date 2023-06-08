export const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost/opd-que-api/"
    : process.env.REACT_APP_API_URL;
