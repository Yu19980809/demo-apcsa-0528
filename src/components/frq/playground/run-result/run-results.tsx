import { forwardRef, useEffect, useState } from 'react'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import {
  AppWindowMac,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

import RunResultSkeleton from './run-result-skeleton'
import { Button } from '@/components/ui/button'
import { Hint } from '@/components/ui/hint'
import { FrqDescTab, RunResult, RunStatus, TExplanation } from '@/lib/types'
import Loader from '@/components/global/loader'
import Markdown from '@/components/global/markdown'
import { apiUrl } from '@/lib/constants'

type Props = {
  showExplain?: boolean
  runResult?: RunResult
  isRunning?: boolean
  isExplaining?: boolean
  isCollapsed?: boolean
  setIsCollapsed: React.Dispatch<boolean>
  setIsExplaining: React.Dispatch<boolean>
  setExplanation: React.Dispatch<TExplanation[]>
  setActiveDescTab: React.Dispatch<FrqDescTab>
}

const RunResults = forwardRef(({
  showExplain = false,
  runResult,
  isRunning = false,
  isExplaining = false,
  isCollapsed = false,
  setIsCollapsed,
  setIsExplaining,
  setExplanation,
  setActiveDescTab
}: Props, ref: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<TExplanation[]>([])

  useEffect(() => setExplanation(messages), [messages])

  const onExplain = async () => {
    setIsLoading(true)
    setIsExplaining(true)
    setActiveDescTab(FrqDescTab.EXPLANATION)

    let response = ''
    const len = messages.length
    const ctrl = new AbortController()
    const runId = localStorage.getItem('run_id')
    const password = import.meta.env.VITE_GENAI_PASSWORD

    fetchEventSource(`${apiUrl}/genai/explain/${runId}?password=${password}`, {
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
        if (msg.event === 'end') return setIsLoading(false)
        setIsExplaining(false)

        response += msg.data
        const temp = { isUserMessage: false, content: response }
        if (len === 0) return setMessages([temp])

        const newMessages = messages.map((item, index) => {
          return index === len - 1 ? temp : item
        })

        setMessages(newMessages)
      },
      onclose: () => {
        console.log('onclose')
      },
      onerror: err => {
        console.log('ERROR_SUBMIT', err)
        ctrl.abort()
      }
    })
  }

  return (
    <>
      {isCollapsed && (
        <div className="flex justify-between items-center h-[50px] p-1 rounded-md border bg-background">
          <div className="flex items-center gap-x-1">
            <Button asChild variant="ghost">
              <div className="bg-accent text-accent-foreground cursor-pointer">
                {isRunning ? <Loader /> : <AppWindowMac className="w-4 h-4 text-green-500" />}

                <span className="ml-1">Run result</span>
              </div>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(false)}
          >
            <Hint label="Expand" side="left" align="center">
              <ChevronUp className="w-5 h-5" />
            </Hint>
          </Button>
        </div>
      )}

      {!isCollapsed && (
        <div ref={ref} className="relative flex-1 flex flex-col rounded-md border overflow-hidden">
          <div className="flex justify-between items-center p-1 bg-background/50">
            <div className="flex items-center gap-x-1">
              <Button asChild variant="ghost">
                <div className="bg-accent text-accent-foreground cursor-pointer">
                  {isRunning ? <Loader /> : <AppWindowMac className="w-4 h-4 text-green-500" />}

                  <span className="ml-1">Run result</span>
                </div>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(true)}
            >
              <Hint label="Collapse" side="left" align="center">
                <ChevronDown className="w-5 h-5" />
              </Hint>
            </Button>
          </div>

          <div className="flex-1 flex justify-center items-center p-2 bg-background overflow-y-auto">
            {isRunning && <RunResultSkeleton />}

            {!isRunning && !runResult && (
              <div className="flex justify-center items-center text-muted-foreground">
                You need to run the code
              </div>
            )}

            {!isRunning && runResult && (
              <div className="flex flex-col w-full h-full p-2">
                {runResult.worst_test_result.status === RunStatus.CORRECT && (
                  <>
                    <h1 className="font-semibold text-lg text-emerald-500">
                      All Correct
                    </h1>

                    <div className="flex-1 flex justify-center items-center">
                      You are good to submit
                    </div>
                  </>
                )}

                {runResult.worst_test_result.status == RunStatus.COMPILE_ERROR && (
                  <>
                    <h1 className="font-semibold text-lg text-rose-500">
                      Compile Error
                    </h1>

                    <div className="flex-1 mt-4">
                      <Markdown content={`\`\`\`java \n ${runResult.worst_test_result.compilation_error}\`\`\``} />
                    </div>
                  </>
                )}

                {runResult.worst_test_result.status == RunStatus.COMPILE_TIMEOUT && (
                  <>
                    <h1 className="font-semibold text-lg text-rose-500">
                      Compile Timeout
                    </h1>

                    <div className="flex-1 flex justify-center items-center">
                      Try to run the code again.
                    </div>
                  </>
                )}

                {runResult.worst_test_result.status == RunStatus.RUNTIME_CATCHED && (
                  <>
                    <h1 className="font-semibold text-lg text-rose-500">
                      Runtime Catched
                    </h1>

                    <div className="flex-1">
                      <Markdown content={runResult.worst_test_result.runtime_error} />
                    </div>
                  </>
                )}

                {runResult.worst_test_result.status == RunStatus.RUNTIME_ERROR && (
                  <>
                    <h1 className="font-semibold text-lg text-rose-500">
                      Runtime Error
                    </h1>

                    <div className="flex-1">
                      <Markdown content={runResult.worst_test_result.runtime_error} />
                    </div>
                  </>
                )}

                {runResult.worst_test_result.status == RunStatus.WRONG_ANSWER && (
                  <>
                    <h1 className="font-semibold text-lg text-rose-500">
                      Wrong Answer
                    </h1>

                    <div className="flex-1 flex flex-col gap-y-3 mt-4">
                      <div className="flex flex-col gap-y-1">
                        <p>Input</p>
                        <div className="w-full px-4 py-2 rounded-md bg-secondary">
                          <Markdown content={runResult.worst_test_result.input} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-y-1">
                        <p>Output</p>
                        <div className="w-full px-4 py-2 rounded-md bg-secondary">
                          <Markdown content={runResult.worst_test_result.output} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-y-1">
                        <p>Expected</p>
                        <div className="w-full px-4 py-2 rounded-md bg-secondary">
                          <Markdown content={runResult.worst_test_result.expected} />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {showExplain && !isRunning && runResult && runResult.worst_test_result.status !== RunStatus.CORRECT && (
            <Button
              onClick={onExplain}
              disabled={isLoading}
              variant="outline"
              className="absolute right-6 top-[60px] z-10"
            >
              {isLoading ? <Loader /> : 'Explain'}
            </Button>
          )}
        </div>
      )}
    </>
  )
})

export default RunResults
