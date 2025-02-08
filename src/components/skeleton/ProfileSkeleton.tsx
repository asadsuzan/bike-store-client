

const ProfileSkeleton = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 w-32 bg-gray-300 rounded"></div>
        <div className="h-4 w-16 bg-red-300 rounded"></div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div>
            <div className="h-5 w-48 bg-gray-300 rounded mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <div className="h-5 w-48 bg-gray-300 rounded mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="h-10 w-full bg-green-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
