import { forwardRef, useEffect, useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Frq, FrqDescTab, SubmitCode, SubmitRelated, SubmitScore, TExplanation } from '@/lib/types'
import { descriptionTabs } from '@/lib/constants'
import Loader from '@/components/global/loader'
import Markdown from '@/components/global/markdown'
import { Hint } from '@/components/ui/hint'
import { Button } from '@/components/ui/button'
import DescriptionSkeleton from './description-skeleton'
import Result from '@/components/frq/info/result/result'
import Explanation from '@/components/frq/info/explanation/explanation'
import ResultSkeleton from '@/components/frq/info/result/result-skeleton'
import SolutionsSkeleton from '@/components/frq/info/solution/solutions-skeleton'
import ExplanationSkeleton from '@/components/frq/info/explanation/explanation-skeleton'
import Solutions from '../solution/solutions'

type Props = {
  data?: Frq
  // submitResult?: any
  submitScore?: SubmitScore
  submitSummary?: string[]
  submitRelated?: SubmitRelated
  submitCode?: SubmitCode
  explanation?: TExplanation[]
  isCollapsed?: boolean
  isExplaining?: boolean
  isSubmitting?: boolean
  activeDescTab?: FrqDescTab
  showResult?: boolean
  showExplanation?: boolean
  setIsCollapsed: React.Dispatch<boolean>
  setActiveDescTab: React.Dispatch<FrqDescTab>
}

const Description = forwardRef(({
  data,
  // submitResult,
  submitScore,
  submitSummary,
  submitRelated,
  submitCode,
  explanation = [],
  isExplaining = false,
  isSubmitting = false,
  isCollapsed = false,
  activeDescTab = FrqDescTab.DESCRIPTION,
  showResult = true,
  showExplanation = true,
  setIsCollapsed,
  setActiveDescTab
}: Props, ref: any) => {
  const [activeTab, setActiveTab] = useState<FrqDescTab>(FrqDescTab.DESCRIPTION)

  useEffect(() => {
    setActiveTab(activeDescTab)
    if (activeDescTab === FrqDescTab.RESULT) showResult = true
    if (activeDescTab === FrqDescTab.EXPLANATION) showExplanation = true
  }, [activeDescTab])

  const onTabSelect = (tab: FrqDescTab) => {
    setActiveTab(tab)
    setActiveDescTab(tab)
  }

  return (
    <div className={cn('h-full transition-all', isCollapsed ? 'w-[50px]' : '')}>
      {isCollapsed && (
        <div className="flex flex-col justify-between items-center w-[50px] h-full p-2 rounded-md bg-background">
          <div className="relative -left-1/2 -top-10 flex items-center gap-1 h-9 transform translate-x-1/2 rotate-90 origin-bottom-left">
            {descriptionTabs.map(item => (
              <Button
                key={item.label}
                asChild
                variant="ghost"
                onClick={() => onTabSelect(item.value)}
              >
                <div className={cn(
                  'flex items-center gap-x-1 cursor-pointer',
                  item.value === activeTab && 'bg-accent text-accent-foreground'
                )}>
                  {
                    (isExplaining && item.label === 'Explanation') || (isSubmitting && item.label === 'Result')
                      ? <Loader />
                      : <item.icon className="w-4 h-4 text-sky-500" />
                  }

                  <span>{item.label}</span>
                </div>
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(false)}
          >
            <Hint label="Expand" side="right" align="center">
              <ChevronRight className="w-5 h-5" />
            </Hint>
          </Button>
        </div>
      )}

      {!isCollapsed && (
        <div ref={ref} className="flex flex-col h-full rounded-md border overflow-hidden">
          <div className="flex justify-between items-center p-1 bg-background/50">
            <div className="flex items-center gap-x-1">
              {descriptionTabs.map(item => (
                <Button
                  key={item.label}
                  asChild
                  variant="ghost"
                  onClick={() => onTabSelect(item.value)}
                >
                  <div className={cn(
                    'flex items-center gap-x-1 cursor-pointer',
                    item.value === activeTab && 'bg-accent text-accent-foreground'
                  )}>
                    {
                      // (isExplaining && item.label === 'Explanation') || (isSubmitting && item.label === 'Result')
                      //   ? <Loader />
                      //   : <item.icon className="w-4 h-4 text-sky-500" />
                      (isSubmitting && item.label === 'Result')
                        ? <Loader />
                        : <item.icon className="w-4 h-4 text-sky-500" />
                    }

                    <span>{item.label}</span>
                  </div>
                </Button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(true)}
            >
              <Hint label="Collapse" side="left" align="center">
                <ChevronLeft className="w-5 h-5" />
              </Hint>
            </Button>
          </div>

          <div className="flex-1 p-2 bg-background overflow-auto">
            {activeTab === FrqDescTab.DESCRIPTION && !data?.description && <DescriptionSkeleton />}
            {activeTab === FrqDescTab.DESCRIPTION && data?.description && (
              <div className="flex px-8 py-4">
                <Markdown content={data.description} />
              </div>
            )}

            {activeTab === FrqDescTab.SOLUTIONS && (!data?.solutions || !data?.solutions.length) && <SolutionsSkeleton />}
            {activeTab === FrqDescTab.SOLUTIONS && data?.solutions && <Solutions data={data?.solutions} />}

            {/* {activeTab === FrqDescTab.EXPLANATION && !isExplaining && <Explanation data={explanation} />} */}
            {/* {activeTab === FrqDescTab.EXPLANATION && isExplaining && <ExplanationSkeleton />} */}
            {activeTab === FrqDescTab.EXPLANATION && (
              <Explanation
                data={explanation}
                isThinking={isExplaining}
              />
            )}

            {activeTab === FrqDescTab.RESULT && isSubmitting && <ResultSkeleton />}
            {activeTab === FrqDescTab.RESULT && !isSubmitting && (
              <Result
                submitScore={submitScore}
                submitSummary={submitSummary}
                submitRelated={submitRelated}
                submitCode={submitCode}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
})

export default Description
