//One possible way to send token without repeating code but I decide to use the axios interceptor method in the axios file.
const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  };
};

export default authHeader;
