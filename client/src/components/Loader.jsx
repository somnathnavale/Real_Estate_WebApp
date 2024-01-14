
const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-200 bg-opacity-80 z-50">
      <div className="animate-spin rounded-full border-t-2 border-b-2 border-gray-700 h-16 w-16 mb-2"></div>
      <p className="text-gray-700">Loading...</p>
    </div>
  );
};

export default Loader;
