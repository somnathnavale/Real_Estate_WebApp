import Filter from '../filter/Filter';
import AllListings from './AllListings';

const Listings = () => {
  
  return (
    <div className="flex flex-col gap-4 md:gap-8 md:flex-row items-start xl:mx-auto max-w-screen-xl my-4 px-4 lg:px-6 xl:p-0">
      <Filter/>
      <AllListings/>
    </div>
  )
}

export default Listings