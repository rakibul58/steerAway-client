const SkeletonCard = () => {
  return (
    <div className="p-4">
      <div className="bg-secondary rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
        <div className="animate-pulse">
          {/* Image Skeleton */}
          <div className="w-full h-48 dark:bg-gray-300 bg-gray-700"></div>

          {/* Content Skeleton */}
          <div className="p-6">
            {/* Title Skeleton */}
            <div className="h-6 dark:bg-gray-300 bg-gray-700 mb-2 rounded"></div>

            {/* Description Skeleton */}
            <div className="h-4 dark:bg-gray-300 bg-gray-700 mb-4 rounded"></div>

            {/* Price and Button Skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-6 dark:bg-gray-300 bg-gray-700 w-1/3 rounded"></div>
              <div className="h-8 dark:bg-gray-300 bg-gray-700 w-16 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
