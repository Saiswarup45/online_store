function SkeletonCard() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow animate-pulse">
      <div className="h-40 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 bg-gray-300 mb-2 rounded"></div>
      <div className="h-4 bg-gray-300 w-1/2 mb-3 rounded"></div>
      <div className="h-8 bg-gray-300 rounded"></div>
    </div>
  );
}

export default SkeletonCard;