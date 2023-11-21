import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const Layout = () => {
  const enums=useSelector(store=>store.enum);
  const user=useSelector(store=>store.user);
  const listing=useSelector(store=>store.listing);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    const load=[enums.status,user.status,listing.status].find(status=>status==='loading')
    if(load){
      setLoading(true);
    }else{
      setLoading(false);
    }
  },[enums,user,listing]);

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <div className="flex-grow">
        <>
          {loading && <Loader/>}
          <Outlet />
        </>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
