import { useState } from 'react'

import { Frq, FrqTab } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { frqTabs } from '@/lib/constants'
import { cn } from '@/lib/utils'

const QuestionArea = ({ data }: { data: Frq }) => {
  const [activeTab, setActiveTab] = useState<string>(FrqTab.DESCRIPTION)
  console.log('data', data)

  return (
    <>
      <div className="flex items-center">
        {frqTabs.map(item => (
          <Button
            key={item.value}
            variant="outline"
            onClick={() => setActiveTab(item.value)}
            className={cn(activeTab === item.value && 'bg-accent')}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div className="flex flex-col rounded-md border h-full">
          {activeTab === FrqTab.DESCRIPTION && 'Description'}
          {activeTab === FrqTab.SOLUTION && 'Solution'}
          {activeTab === FrqTab.RESULT && 'Result'}
      </div>
    </>
  )
}

export default QuestionArea
