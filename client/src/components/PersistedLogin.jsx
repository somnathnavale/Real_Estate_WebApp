import  { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateToken } from "../redux/user/userService";
import { Outlet } from "react-router-dom";

const PersistedLogin = () => {
  const [loading, setLoading] = useState(true);
  const callRef = useRef(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!callRef.current) {
      callRef.current = true;
      if (user === null) {
        dispatch(generateToken())
          .unwrap()
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  }, [dispatch, user]);

  return <>{loading ? <p></p> : <Outlet />}</>;
};

export default PersistedLogin;
