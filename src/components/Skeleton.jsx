import React from "react";

const Skeleton = () => {
  return (
   <div className="flex w-full justify-around">
    <div className="animate-pulse p-4 bg-white rounded-2xl shadow-md w-full max-w-sm">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
      
      {/* Title Skeleton */}
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
      
      {/* Subtitle Skeleton */}
      <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
      
      {/* Buttons Skeleton */}
      <div className="flex space-x-4">
        <div className="h-8 bg-gray-300 rounded-full w-20"></div>
        <div className="h-8 bg-gray-300 rounded-full w-20"></div>
      </div>
    </div>
    <div className="animate-pulse p-4 bg-white rounded-2xl shadow-md w-full max-w-sm">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
      
      {/* Title Skeleton */}
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
      
      {/* Subtitle Skeleton */}
      <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
      
      {/* Buttons Skeleton */}
      <div className="flex space-x-4">
        <div className="h-8 bg-gray-300 rounded-full w-20"></div>
        <div className="h-8 bg-gray-300 rounded-full w-20"></div>
      </div>
    </div><div className="animate-pulse p-4 bg-white rounded-2xl shadow-md w-full max-w-sm">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
      
      {/* Title Skeleton */}
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
      
      {/* Subtitle Skeleton */}
      <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
      
      {/* Buttons Skeleton */}
      <div className="flex space-x-4">
        <div className="h-8 bg-gray-300 rounded-full w-20"></div>
        <div className="h-8 bg-gray-300 rounded-full w-20"></div>
      </div>
    </div>
   </div>
  );
};
export function CounterDetailsSkeleton(){
  return (
    <div className="space-y-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded-lg w-2/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded-lg w-1/3 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-lg shadow-lg p-6 border border-gray-200"
              >
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="h-4 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}
export default Skeleton;
