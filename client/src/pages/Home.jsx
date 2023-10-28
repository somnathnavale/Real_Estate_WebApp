import React from "react";
import FeaturedProperty from "./FeaturedProperty";
import HomePoster from "./HomePoster";
import RecentListings from "./RecentListings";
import ContactLabel from "./ContactLabel";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <HomePoster />
      <FeaturedProperty />
      <RecentListings/>
      <ContactLabel/>
      <Footer/>
    </>
  );
};

export default Home;
