import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

type Props = {
  open: boolean
  label: string
  isWholePage?: boolean
  className?: string
}

const LoadingModal = ({
  open,
  label,
  className,
  isWholePage = true
}: Props) => {
  return (
    <div className={cn(
      'z-50 flex-col gap-y-4 justify-center items-center bg-black/80 text-lg text-white/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      open ? 'flex' : 'hidden',
      isWholePage ? 'fixed inset-0' : 'w-full h-full',
      className
    )}>
      <Loader2 className="w-10 h-10 animate-spin" />
      <span>{label}</span>
    </div>
  )
}

export default LoadingModal
