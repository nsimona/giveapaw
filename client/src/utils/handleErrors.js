export const getErrorMessages = (error) => {
  if (error.response.status === 502) {
    return ["502 server error"];
  }
  return error.response.data.errors.map((err) => err.message);
};

export const getErrorWholeMessages = (error) => {
  return error.response.data.errors.message;
};
