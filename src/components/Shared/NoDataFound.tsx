const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4  p-6 rounded-lg">
      <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c2.21 0 4-1.79 4-4S14.21 0 12 0 8 1.79 8 4s1.79 4 4 4zm0 2c-4.41 0-8 2.69-8 6v4h16v-4c0-3.31-3.59-6-8-6z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-[#dedee0]">
        No Data Available
      </h2>
      <p className="text-lg text-[#dedee0]">
        We couldn't find any data matching your criteria. Try modifying the
        filters.
      </p>
    </div>
  );
};

export default NoDataFound;
