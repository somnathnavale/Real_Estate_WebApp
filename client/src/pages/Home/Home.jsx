import FeaturedProperty from "./FeaturedProperty";
import HomePoster from "./HomePoster";
import RecentListings from "./RecentListings";
import ContactLabel from "./ContactLabel";

const Home = () => {
  return (
    <>
      <HomePoster />
      <FeaturedProperty />
      <RecentListings/>
      <ContactLabel/>
    </>
  );
};

export default Home;
