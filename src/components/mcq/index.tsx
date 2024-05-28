import { useEffect, useState } from 'react'

import { Mcq, McqWithStatus, Mode, TopbarType } from '@/lib/types'
import Topbar from '@/components/global/top-bar'
import Container from '@/components/global/container'
import StatusBar from '@/components/mcq/status-bar'
import Actions from '@/components/mcq/actions'
import Question from '@/components/mcq/question'

type Props = {
  mode: Mode
  data: Mcq[]
}

const McqTemplate = ({ mode, data }: Props) => {
  const [questions, setQuestions] = useState<McqWithStatus[]>([])
  const [isMcqFinished, setIsMcqFinished] = useState<boolean>(false)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0)

  useEffect(() => {
    const formattedData = data.map(item => {
      const newItem = {
        ...item,
        isFinished: false,
        isStarred: false,
        isMarked: false,
        userAnswer: undefined
      }

      return newItem
    })

    setQuestions(formattedData)
  }, [data])

  return (
    <div className="h-full">
      <Topbar
        type={TopbarType.MCQ}
        mode={mode}
        label={questions[activeQuestionIndex]?.name}
        isMcqFinished={isMcqFinished}
        setIsMcqFinished={setIsMcqFinished}
      />

      <Container className="h-[calc(100vh-80px)]">
        <div className="flex flex-col gap-y-8 h-full px-4 py-10">
          <StatusBar
            data={questions}
            setActiveQuestionIndex={setActiveQuestionIndex}
          />
          
          <div className="flex-1">
            <Question
              data={questions}
              activeQuestionIndex={activeQuestionIndex}
              setQuestions={setQuestions}
            />
          </div>

          <Actions
            mode={mode}
            data={questions}
            activeQuestionIndex={activeQuestionIndex}
            setActiveQuestionIndex={setActiveQuestionIndex}
            setQuestions={setQuestions}
            setIsMcqFinished={setIsMcqFinished}
          />
        </div>
      </Container>
    </div>
  )
}

export default McqTemplate
