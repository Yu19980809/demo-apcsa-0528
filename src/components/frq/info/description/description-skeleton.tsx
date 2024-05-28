import { Skeleton } from '@/components/ui/skeleton'

const DescriptionSkeleton = () => {
  return (
    <div className="p-4">
      <Skeleton className="w-[100px] h-10 mb-6" />

      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex flex-col gap-y-4 mb-6">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-2/3 h-8" />
          <Skeleton className="w-1/2 h-8" />
        </div>
      ))}
    </div>
  )
}

export default DescriptionSkeleton
