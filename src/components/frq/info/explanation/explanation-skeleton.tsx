import { Skeleton } from '@/components/ui/skeleton'

const ExplanationSkeleton = () => {
  return (
    <div className="relative flex flex-col w-full h-full px-6 py-4">
      <div className="flex-1 flex flex-col gap-y-4 overflow-y-auto">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-start gap-x-2">
            <Skeleton className="w-[40px] h-[40px] rounded-full" />
            <Skeleton className="md:w-[600px] w-[400px] h-[80px]" />
          </div>
        ))}
      </div>

      <Skeleton className="absolute right-10 bottom-4 w-20 h-10" />
    </div>
  )
}

export default ExplanationSkeleton
