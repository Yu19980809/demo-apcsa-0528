import { ChoiceLabel, McqWithStatus } from '@/lib/types'
import RadioGroup from '@/components/global/radio-group'

type Props = {
  data: McqWithStatus[]
  activeQuestionIndex: number
  setQuestions: React.Dispatch<McqWithStatus[]>
}

const Question = ({
  data,
  activeQuestionIndex,
  setQuestions
}: Props) => {
  const currentQuestion = data[activeQuestionIndex]

  const onSelect = (choice: ChoiceLabel) => {
    let userAnswer = data[activeQuestionIndex].userAnswer
    userAnswer = currentQuestion.userAnswer === choice ? undefined : choice
    data[activeQuestionIndex].userAnswer = userAnswer
    setQuestions(data)
  }

  return (
    <>
      <h2 className="font-semibold text-lg">
        Q{activeQuestionIndex + 1}. {currentQuestion?.description}
      </h2>

      <RadioGroup
        activeQuestionIndex={activeQuestionIndex}
        choices={currentQuestion?.choices}
        selected={currentQuestion?.userAnswer}
        onSelect={onSelect}
      />
    </>
  )
}

export default Question
