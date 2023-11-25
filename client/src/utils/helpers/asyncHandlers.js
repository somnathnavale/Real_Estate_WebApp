export const asyncHandler = (fn) => {
  return async (props, thunkAPI) => {
    try {
      return await fn(props, thunkAPI);
    } catch (error) {
      if (error?.response?.data) throw error?.response?.data;
      throw error?.message;
    }
  };
};
