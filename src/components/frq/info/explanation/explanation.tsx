import { useEffect, useState } from 'react'
import { fetchEventSource } from '@microsoft/fetch-event-source'

import ChatInput from './chat-input'
import Messages from './messages'
import { TExplanation } from '@/lib/types'
import empty from '@/assets/no-data.png'

type Props = {
  data: TExplanation[]
  isThinking: boolean
}

const Explanation = ({ data, isThinking = false }: Props) => {
  const [messages, setMessages] = useState<TExplanation[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(isThinking)

  const apiUrl = import.meta.env.VITE_API_URL
  const password = import.meta.env.VITE_GENAI_PASSWORD
  const runId = localStorage.getItem('run_id')

  useEffect(() => setMessages(data), [data])
  useEffect(() => setIsLoading(isThinking), [isThinking])

  // useEffect(() => {
  //   if (!runId) return
  //   // setIsLoading(true)

  //   let response = ''
  //   const len = messages.length
  //   const ctrl = new AbortController()
  //   // const source = new EventSource(`${apiUrl}/genai/explain/${runId}?password=${password}`)

  //   // source.onmessage = e => {
  //   //   if (isLoading) setIsLoading(false)
  //   //   response += e.data
  //   //   const temp = { isUserMessage: false, content: response }
  //   //   if (len === 0) return setMessages([temp])

  //   //   const newMessages = messages.map((item, index) => {
  //   //     return index === len - 1 ? temp : item
  //   //   })

  //   //   setMessages(newMessages)
  //   // }
  //   // source.addEventListener('end', () => source.close())

  //   // return () => source.close()

  //   fetchEventSource(`${apiUrl}/genai/explain/${runId}?password=${password}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': localStorage.getItem('access_token') || ''
  //     },
  //     openWhenHidden: true,
  //     signal: ctrl.signal,
  //     onopen: async (res) => {
  //       console.log('onopen', res)
  //       setIsLoading(false)
  //     },
  //     onmessage: msg => {
  //       if (isLoading) setIsLoading(false)
  //       response += msg.data
  //       const temp = { isUserMessage: false, content: response }
  //       if (len === 0) return setMessages([temp])
  
  //       const newMessages = messages.map((item, index) => {
  //         return index === len - 1 ? temp : item
  //       })
  
  //       setMessages(newMessages)
  //     },
  //     onclose: () => {
  //       console.log('onclose')
  //     },
  //     onerror: err => {
  //       console.log('ERROR_SUBMIT', err)
  //       ctrl.abort()
  //     }
  //   })
  // }, [])

  useEffect(() => {
    const len = messages.length
    const last = messages[len - 1]
    if (!last?.isUserMessage) return

    const ctrl = new AbortController()
    let response = ''

    // const source = new EventSource(`${apiUrl}/genai/chat/${runId}?password=${password}&question=${last.content}`)
    // source.onmessage = e => {
    //   if (isLoading) setIsLoading(false)
    //   response += e.data
    //   const temp = { isUserMessage: false, content: response }
    //   // @ts-ignore
    //   setMessages((prev: TExplanation[]) => {
    //     let newMessages
    //     const currentLen = prev.length
    //     if (currentLen === len) {
    //       newMessages = [...prev, temp]
    //     } else {
    //       newMessages = prev.map((item, index) => {
    //         return index === currentLen - 1 ? temp : item
    //       })
    //     }

    //     return newMessages
    //   })
    // }
    // source.addEventListener('end', () => source.close())

    fetchEventSource(`${apiUrl}/genai/chat/${runId}?password=${password}&question=${last.content}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token') || ''
      },
      openWhenHidden: true,
      signal: ctrl.signal,
      onopen: async (res) => {
        console.log('onopen', res)
        setMessages(prev => [...prev, { isUserMessage: false, content: '' }])
      },
      onmessage: msg => {
          if (isLoading) setIsLoading(false)
          if (msg.event === 'run_id') return
          setIsLoading(false)

          response += msg.data
          const temp = { isUserMessage: false, content: response }
          // @ts-ignore
          setMessages((prev: TExplanation[]) => {
            let newMessages
            const currentLen = prev.length
            if (currentLen === len) {
              newMessages = [...prev, temp]
            } else {
              newMessages = prev.map((item, index) => {
                return index === currentLen - 1 ? temp : item
              })
            }

            return newMessages
          })
      },
      onclose: () => {
        console.log('onclose')
      },
      onerror: err => {
        console.log('ERROR_SUBMIT', err)
        ctrl.abort()
      }
    })
  }, [messages])

  return (
    <>
      {(!messages || messages.length === 0) && !isThinking && (
        <div className="flex flex-col justify-center items-center gap-y-2 h-full">
          <img
            src={empty}
            alt="No Data"
            width={200}
            height={200}
          />

          <p className="text-muted-foreground">
            You haven't used explain function
          </p>
        </div>
      )}

      {((!!messages && messages.length !== 0) || isThinking) && (
        <div className="relative flex flex-col w-full h-full px-6 py-4 pb-[72px]">
          <Messages data={messages} isLoading={isLoading} />

          <ChatInput
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setMessages={setMessages}
          />
        </div>
      )}
    </>
  )
}

export default Explanation
