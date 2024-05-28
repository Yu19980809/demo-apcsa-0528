import { cn } from '@/lib/utils'

const Container = ({
  children,
  className
}: {
  children: React.ReactNode
  className: string
}) => {
  return (
    <div className={cn(
      'w-full max-w-screen-2xl mx-auto px-20',
      className
    )}>
      {children}
    </div>
  )
}

export default Container
