export default function GallerySkeleton() {
  return (
    <div className="space-y-4">
      {/* Main image skeleton */}
      <div className="relative aspect-square h-full w-full animate-pulse bg-gray-200" />

      {/* Blue divider */}
      <div className="h-[2px] w-full bg-452-blue-light" />

      {/* Thumbnails skeleton */}
      <div className="grid grid-cols-4 gap-1 sm:grid-cols-6 lg:grid-cols-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`aspect-square animate-pulse bg-gray-200 ${i >= 4 ? 'hidden sm:block' : ''} ${i >= 6 ? 'hidden lg:block' : ''}`}
          />
        ))}
      </div>

      {/* Navigation buttons skeleton */}
      <div className="mt-4 flex w-full flex-row justify-between border-y-2 border-452-blue-light py-2">
        <div className="ml-2 text-452-blue-light opacity-50 md:ml-4">
          <div className="h-6 w-10 animate-pulse bg-gray-200" />
        </div>
        <div className="mr-2 text-452-blue-light opacity-50 md:mr-4">
          <div className="h-6 w-10 animate-pulse bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
