export const ErrorHandler=(error)=>{
  if(error.isAxiosError){
    if(error.response){
      const {message,status}=error.response.data;
      const statusCode=error.response.status;
      return {message,status,statusCode}
    }else if(error.request){
      return {message:error?.message || "Network Error",status:"error",statusCode:0};
    }else{
      return {message:error?.message || "Unknown Error",status:"error",statusCode:500};
    }
  }

  return {message:"Something went wrong",status:"error",statusCode:500};
}

export const asyncHandler = (fn) => {
  return async (props, thunkAPI) => {
    try {
      return await fn(props, thunkAPI);
    } catch (error) {
      const {rejectWithValue}=thunkAPI;
      const errObj=ErrorHandler(error);
      if(errObj.statusCode===403){
        try {
          return await fn(props, thunkAPI);
        } catch (err) {
          const {rejectWithValue}=thunkAPI;
          const innerErrObj=ErrorHandler(error);
          throw rejectWithValue(innerErrObj);
        }
      }
      throw rejectWithValue(errObj);
    }
  };
};
