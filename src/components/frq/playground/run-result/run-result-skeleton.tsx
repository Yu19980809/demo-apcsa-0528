import { Skeleton } from '@/components/ui/skeleton'

const RunResultSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-4 w-full h-full">
      <Skeleton className="w-[400px] h-10 rounded-md bg-accent" />

      <div className="flex items-center gap-x-2">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="w-[200px] h-8 rounded-md bg-accent" />
        ))}
      </div>

      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex flex-col gap-y-2">
          <Skeleton className="w-[100px] h-4 bg-accent" />
          <Skeleton className="w-[full h-6 bg-accent" />
        </div>
      ))}
    </div>
  )
}

export default RunResultSkeleton
