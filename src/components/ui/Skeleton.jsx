import React, { memo } from 'react';
import { useSelector } from 'react-redux';

const Skeleton = memo(({ type = 'card', count = 1 }) => {
  const { theme } = useSelector(s => s.settings);
  const bg = theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200';
  const shimmer = theme === 'dark' ? 'bg-slate-700' : 'bg-gray-300';

  const CardSkeleton = () => (
    <div className={`rounded-2xl overflow-hidden ${bg}`}>
      <div className={`h-48 ${shimmer} animate-pulse`} />
      <div className="p-5 space-y-3">
        <div className={`h-4 ${shimmer} rounded animate-pulse w-1/3`} />
        <div className={`h-5 ${shimmer} rounded animate-pulse w-2/3`} />
        <div className={`h-3 ${shimmer} rounded animate-pulse w-full`} />
        <div className={`h-3 ${shimmer} rounded animate-pulse w-1/2`} />
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className={`flex items-center gap-4 p-4 rounded-xl ${bg}`}>
      <div className={`w-12 h-12 rounded-full ${shimmer} animate-pulse`} />
      <div className="flex-1 space-y-2">
        <div className={`h-4 ${shimmer} rounded animate-pulse w-1/3`} />
        <div className={`h-3 ${shimmer} rounded animate-pulse w-1/2`} />
      </div>
    </div>
  );

  const TextSkeleton = () => (
    <div className="space-y-3">
      <div className={`h-4 ${shimmer} rounded animate-pulse w-full`} />
      <div className={`h-4 ${shimmer} rounded animate-pulse w-5/6`} />
      <div className={`h-4 ${shimmer} rounded animate-pulse w-4/6`} />
    </div>
  );

  const skeletons = { card: CardSkeleton, list: ListSkeleton, text: TextSkeleton };
  const SkeletonComponent = skeletons[type] || CardSkeleton;

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
});

Skeleton.displayName = 'Skeleton';
export default Skeleton;
