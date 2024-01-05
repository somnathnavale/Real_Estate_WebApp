import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="max-w-screen-xl mx-4 xl:mx-auto py-4 h-full flex items-center flex-col">
      <p className="text-lg text-medium text-red-600">This Page is Not Found</p>
      <Link to="/" className="underline underline-offset-2 text-blue-800">
        Visit Home
      </Link>
    </div>
  );
};

export default NotFound;
