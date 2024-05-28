import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { Choice, ChoiceLabel } from '@/lib/types'

type Props = {
  activeQuestionIndex: number
  choices?: Choice[]
  selected?: ChoiceLabel
  onSelect: (choice: ChoiceLabel) => void
}

const RadioGroup = ({ activeQuestionIndex, choices, selected, onSelect }: Props) => {
  const [selectedChoice, setSelectedChoice] = useState<ChoiceLabel>()

  const onSelectChoice = (choice: ChoiceLabel) => {
    onSelect(choice)

    setSelectedChoice(prev => {
      prev = prev ===choice ? undefined : choice
      return prev
    })
  }

  useEffect(() => {
    !selected ? setSelectedChoice(undefined) : setSelectedChoice(selected)
  }, [activeQuestionIndex, selected])

  return (
    <div className="flex flex-col gap-y-4 px-6 py-10">
      {choices?.map(item => (
        <div
          key={item.label}
          onClick={() => onSelectChoice(item.label)}
          className={cn(
            'group flex items-center gap-x-2 p-2 pl-4 rounded-md cursor-pointer hover:bg-secondary',
            selectedChoice === item.label && 'bg-sky-100/80 hover:bg-sky-100/80 dark:bg-sky-900/80'
          )}
        >
          <span className={cn(
            'flex justify-center items-center w-7 h-7 rounded-full border group-hover:bg-sky-500 group-hover:text-white',
            selectedChoice === item.label && 'bg-sky-500 text-white'
          )}>
            {item.label}
          </span>

          <span>{item.content}</span>
        </div>
      ))}
    </div>
  )
}

export default RadioGroup
