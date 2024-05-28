import { useState } from 'react'
import { ChevronRight, SendHorizonal } from 'lucide-react'

import { Hint } from '@/components/ui/hint'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TExplanation } from '@/lib/types'

type Props = {
  isLoading: boolean
  setIsLoading: React.Dispatch<boolean>
  setMessages: React.Dispatch<TExplanation[]>
}

const ChatInput = ({
  isLoading,
  setIsLoading,
  setMessages
}: Props) => {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')

  let response = ''
  const apiUrl = import.meta.env.VITE_API_URL
  const password = import.meta.env.VITE_GENAI_PASSWORD
  const runId = localStorage.getItem('run_id')

  const onChat = () => {
    setIsLoading(true)
    const chat = { isUserMessage: true, content: query } as TExplanation
    setQuery('')
    // @ts-ignore
    setMessages((prev: TExplanation[]) => [...prev, chat])
  }

  return (
    <>
      {!showInput && (
        <Button
          onClick={() => setShowInput(true)}
          className="absolute right-10 bottom-4"
        >
          Chat with AI
        </Button>
      )}

      {showInput && (
        <div className="absolute left-0 bottom-4 flex items-center gap-x-2 w-full px-6">
          <div className="flex-1">
            <Input
              type="text"
              value={query}
              placeholder="Enter your question..."
              className="w-full px-4 py-2 focus-visible:outline-none"
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <Hint
            asChild
            label="Send the question you typed to ask AI"
            side="top"
            align="center"
          >
            <Button variant="outline" size="sm" onClick={onChat}>
              <SendHorizonal className="w-5 h-5" />
            </Button>
          </Hint>

          <Hint
            asChild
            label="Collapse chat input"
            side="top"
            align="center"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInput(false)}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}

export default ChatInput
