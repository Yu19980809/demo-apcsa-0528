import { TExplanation } from '@/lib/types'
// import logo from '@/assets/react.svg'
import MessageItem from './message-item'

type Props = {
  data: TExplanation[]
  isLoading: boolean
}

const Messages = ({ data, isLoading }: Props) => {
  return (
    <div className="flex flex-col gap-y-4 overflow-y-auto">
      {data.map((item, index) => (
        <MessageItem key={index} data={item} isLoading={isLoading} />
      ))}
    </div>
  )
}

export default Messages
