import { useEffect, useState } from 'react'

import { Mcq, Mode } from '@/lib/types'
import { mcqQuestions } from '@/lib/constants'
import McqTemplate from '@/components/mcq'

const ExamMcq = () => {
  const [questions, setQuestions] = useState<Mcq[]>([])

  useEffect(() => {
    setQuestions(mcqQuestions)
  }, [])

  return (
    <McqTemplate mode={Mode.EXAM} data={questions} />
  )
}

export default ExamMcq
