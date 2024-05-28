import { Skeleton } from '@/components/ui/skeleton'

const ResultSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-6 w-full h-full overflow-auto px-6 py-4">
      <div className="flex flex-col gap-y-4">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-[100px] h-8" />
      </div>

      <div className="flex flex-col gap-y-4">
        <Skeleton className="w-full h-10" />
        
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="w-1/2 h-8" />
        ))}
      </div>

      <div className="flex flex-col gap-y-4">
        <Skeleton className="w-full h-10" />
        
        {[...Array(2)].map((_, index) => (
          <Skeleton key={index} className="w-2/3 h-8" />
        ))}
      </div>
    </div>
  )
}

export default ResultSkeleton
