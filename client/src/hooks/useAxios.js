import { useSelector, useDispatch } from "react-redux";
import { generateToken, logout } from "../redux/user/userService";
import { useEffect } from "react";

const useAxios = (axiosInstance) => {
  const accessToken = useSelector((state) => state?.user?.user?.accessToken);
  const dispatch = useDispatch();
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response && error.response.status === 401) {
          await dispatch(logout()).unwrap();
          return Promise.reject(error);
        }
        if (
          error?.response &&
          error?.response?.status === 403 &&
          !error.config?.prevRequest
        ) {
          error.config.prevRequest = true;
          await dispatch(generateToken()).unwrap().then(()=>{
            return Promise.reject(error);
          }).catch((e)=>{
            return Promise.reject(e);
          })
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance, accessToken, dispatch]);

  return axiosInstance;
};

export default useAxios;
