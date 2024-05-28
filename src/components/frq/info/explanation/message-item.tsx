import { cn } from '@/lib/utils'
import logo from '@/assets/react.svg'
import avatar from '@/assets/avatar.jpg'
import { TExplanation } from '@/lib/types'
import Markdown from '@/components/global/markdown'
import Loader from '@/components/global/loader'

type Props = {
  data: TExplanation
  isLoading: boolean
}

const MessageItem = ({ data, isLoading }: Props) => {
  return (
    <div className={cn(
      'flex items-start gap-x-2 w-full',
      data?.isUserMessage && 'flex-row-reverse justift-end'
    )}>
      <img
        src={data?.isUserMessage ? avatar : logo}
        alt="Avatar"
        width={40}
        height={40}
        className="rounded-full"
      />

      <div className="max-w-[600px] px-4 py-2 rounded-md bg-accent">
        {isLoading ? <Loader /> : <Markdown content={data.content} />}
      </div>
    </div>
  )
}

export default MessageItem
