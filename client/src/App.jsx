import React, { useEffect, useRef } from "react";
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

export default function App() {
  const callRef = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!callRef.current) {
      dispatch(getCategoryWiseCount());
      dispatch(getListings());
      dispatch(getEnums());
      callRef.current = true;
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/listings">
          <Route index element={<Listings />} />
          <Route path="add" element={<PrivateRoute />}>
            <Route index element={<AddListings />} />
          </Route>
          <Route path="update/:id" element={<PrivateRoute />}>
            <Route index element={<UpdateListings />} />
          </Route>
          <Route path=":id" element={<ListingPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
