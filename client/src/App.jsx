import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Listings from "./redux/listings/Listings";
import AddListings from "./redux/listings/AddListings";
import ListingPage from "./redux/listings/ListingPage";
import { useDispatch } from "react-redux";
import {
  getCategoryWiseCount,
  getListings,
} from "./redux/listings/listingService";
import { getEnums } from "./redux/enum/enumService";
import UpdateListings from "./redux/listings/UpdateListings";
import NotFound from "./pages/NotFound";
import PersistedLogin from "./components/PersistedLogin";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  const callRef = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!callRef.current) {
      dispatch(getCategoryWiseCount()).unwrap();
      dispatch(getListings()).unwrap();
      dispatch(getEnums()).unwrap();
      callRef.current = true;
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistedLogin />}>
          <Route index element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/listings">
            <Route index element={<Listings />} />
            <Route element={<PrivateRoute />}>
              <Route path="add" element={<AddListings />} />
              <Route path="update/:id" element={<UpdateListings />} />
            </Route>
            <Route path=":id" element={<ListingPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
