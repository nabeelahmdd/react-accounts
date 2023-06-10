export const getErrors = (err) => {
  let message = "";
  Object.keys(err.response.data).map(function (key) {
    message = Array.isArray(err.response.data[key])
      ? err.response.data[key][0]
      : err.response.data[key];
  });
  return message;
};
