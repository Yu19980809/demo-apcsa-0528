import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TbCodeDots } from 'react-icons/tb'
import {
  CheckCheck,
  Code,
  Copy,
  Expand,
  FolderOpen,
  ListChecks,
  Shrink
} from 'lucide-react'

import empty from '@/assets/no-data.png'
import { cn } from '@/lib/utils'
import { SubmitCode, SubmitRelated, SubmitScore } from '@/lib/types'
import Markdown from '@/components/global/markdown'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

type Props = {
  // submitScore?: string
  // submitSummary?: string[]
  // submitRelated?: string
  // submitCode?: string
  submitScore?: SubmitScore
  submitSummary?: string[]
  submitRelated?: SubmitRelated
  submitCode?: SubmitCode
}

const Result = ({
  submitScore,
  submitSummary,
  submitRelated,
  submitCode
}: Props) => {
  // let score: SubmitScore | null = null
  // let code: SubmitCode | null = null
  // let related: SubmitRelated | null = null
  const score = submitScore
  const related = submitRelated
  const code = submitCode

  // if (!!submitScore) score = JSON.parse(submitScore) as SubmitScore
  // if (!!submitRelated) related = JSON.parse(submitRelated) as SubmitRelated
  // if (!!submitCode) code = JSON.parse(submitCode) as SubmitCode

  const [copiedSolution, setCopiedSolution] = useState<string | null>(null)
  const [openCode, setOpenCode] = useState<string[]>([])

  // const result = {
  //   label: 'Score 6/9',
  //   content: [
  //     {
  //       label: 'Method 1 - 3/3'
  //     },
  //     {
  //       label: 'Method 2 - 1/3'
  //     },
  //     {
  //       label: 'Method 3 - 2/3'
  //     }
  //   ]
  // }

  // const essentialKnowledges = [
  //   {
  //     id: 'MOD-2.B.2',
  //     name: 'Constructors are used to set the initial state of an object, which should include initial values for all instance variables.'
  //   },
  //   {
  //     id: 'VAR-2.G.2',
  //     name: 'Nested iteration statements can be written to traverse the 2D array in “row-major order” or “column-major order.'
  //   }
  // ]

  // const questions = [
  //   {
  //     id: '6641da723d0c99a8e87b1c20',
  //     name: 'Random String Chooser'
  //   },
  //   {
  //     id: '6641da723d0c99a8e87b1c1f',
  //     name: 'GameSpinner'
  //   }
  // ]

  // const summary = [
  //   {
  //     label: "Question (a). You’ve got a `';' expected` syntax error.",
  //     content: "You need to improve on the java syntax, particularly the rules for terminating statements with semicolons."
  //   },
  //   {
  //     label: "Question (a). You encountered an array index out of bounds error",
  //     content: "You need to improve the understanding and implementation of array indexing and bounds checking."
  //   },
  //   {
  //     label: "Question (b). You tried to access a variable defined in another methods.",
  //     content: "You need to understand the scope of variables and the relationships between objects and methods."
  //   }
  // ]

  const onCopy = (label: string, content: string) => {
    if (label === copiedSolution) return

    setCopiedSolution(label)
    navigator.clipboard.writeText(content)
    setTimeout(() => setCopiedSolution(null), 5000)
  }

  const onCollapse = (data: string) => {
    setOpenCode(prev => {
      const temp = prev.filter(item => item !== data)
      return temp
    })
  }

  return (
    <div className="flex flex-col gap-y-6 w-full h-full overflow-auto px-6 py-4">
      {!score && !related && !code && (!submitSummary || submitSummary.length === 0) && (
        <div className="flex flex-col gap-y-2 justify-center items-center h-full">
          <img
            src={empty}
            alt="No Data"
            width={200}
            height={200}
          />

          <p className="text-muted-foreground">
            You haven't submitted code yet
          </p>
        </div>
      )}

      {!!score && (
        <div className="flex flex-col gap-y-4">
          <p className="px-4 py-2 rounded-md bg-yellow-500/10 dark:bg-yellow-500/30 font-semibold text-lg">
            Result
          </p>

        
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem key={score.passed} value="score">
              <AccordionTrigger>
                <div className="flex items-center gap-x-2 hover:text-muted-foreground pl-6">
                  <ListChecks className="w-5 h-5 text-yellow-500" />
                  <span>Score {score.passed}/{score.total}</span>
                </div>
              </AccordionTrigger>

              {score && score.details && (
                <AccordionContent className="px-8">
                  <div className="flex flex-col gap-y-2">
                    {score.details.map((item, index) => (
                      <div key={index} className="flex items-center gap-x-2 pl-4">
                        <span className="w-2 h-2 rounded-full border bg-yellow-500" />
                        <span>Method {item.sub_frq_number} {item.passed}/{item.total}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {!!submitSummary && submitSummary.length !== 0 && (
        <div className="flex flex-col gap-y-4">
          <p className="px-4 py-2 rounded-md bg-emerald-500/10 dark:bg-emerald-500/30 font-semibold text-lg">
            Summary
          </p>

          <div className="px-6">
            <Markdown content={submitSummary.join('')} />
          </div>
          {/* {summary.map(item => (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem key={result.label} value={result.label}>
                <AccordionTrigger>
                  <div className="flex items-center gap-x-2 hover:text-muted-foreground pl-6">
                    <span className="w-2 h-2 rounded-[2px] border bg-emerald-500" />
                    <span>{item.label}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-8">
                  <div className="flex items-center gap-x-2 pl-4">
                    <span className="w-2 h-2 rounded-full border bg-emerald-500" />
                    <span>{item.content}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))} */}
        </div>
      )}

      {!!related && (
        <div className="flex flex-col">
          <p className="px-4 py-2 rounded-md bg-sky-500/10 dark:bg-sky-500/30 font-semibold text-lg">
            Next step
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem key='related' value={related[0].id}>
              <AccordionTrigger>
                <div className="flex items-center gap-x-2 hover:text-muted-foreground pl-6">
                  <FolderOpen className="w-5 h-5 text-sky-500" />
                  <span>Related essential knowledges we recommanded you to learn</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-8" defaultValue={related[0].id}>
                <div className="flex flex-col gap-y-2">
                  {related.map(item => (
                    <div key={item.id} className="flex items-center gap-x-2 pl-4">
                      <span className="w-2 h-2 rounded-full border bg-sky-500" />

                      <Link
                        to={`/learn/knowledge/${item.id}`}
                        className="hover:text-muted-foreground hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* <Accordion type="single" collapsible className="w-full">
            <AccordionItem key={result.label} value={result.label}>
              <AccordionTrigger>
                <div className="flex items-center gap-x-2 hover:text-muted-foreground pl-6">
                  <Code className="w-5 h-5 text-sky-500" />
                  <span>Related questions we recommanded you to practice</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-8">
                <div className="flex flex-col gap-y-2">
                  {questions.map(item => (
                    <div className="flex items-center gap-x-2 pl-4">
                      <span className="w-2 h-2 rounded-full border bg-sky-500" />

                      <Link
                        to={`/practive/frq/${item.id}`}
                        className="hover:text-muted-foreground hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}
        </div>
      )}

      {!!code && (
        <div className="flex flex-col gap-y-4">
          <p className="px-4 py-2 rounded-md bg-orange-500/10 dark:bg-orange-500/30 font-semibold text-lg">
            Submitted code
          </p>

          <div className="flex flex-col gap-y-4">
            {code.map(item => (
              <div className="relative flex flex-col">
                <div className={cn(
                  'flex justify-between items-center px-2 h-12 rounded-md bg-black/5 dark:bg-white/10',
                  openCode.includes(item.sub_frq_number) && 'rounded-b-none'
                )}>
                  <div className="flex items-center gap-x-2 text-muted-foreground">
                    <TbCodeDots className="w-5 h-5" />
                    <span>Method {item.sub_frq_number}</span>
                  </div>

                  <div className="flex items-center">
                    <Button
                      onClick={() => onCopy(item.sub_frq_number, item.code)}
                      variant="ghost"
                      size="sm"
                    >
                      {copiedSolution === item.sub_frq_number ? (
                        <CheckCheck className="w-4 h-4 transition hover:scale-110" />
                      ) : (
                        <Copy className="w-4 h-4 transition hover:scale-110" />
                      )}
                    </Button>

                    {openCode.includes(item.sub_frq_number) ? (
                      <Button variant="ghost" size="sm" onClick={() => onCollapse(item.sub_frq_number)}>
                        <Shrink className="w-4 h-4 hover:scale-110" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setOpenCode(prev => [...prev, item.sub_frq_number])}
                        variant="ghost"
                        size="sm"
                      >
                        <Expand className="w-4 h-4 hover:scale-110" />
                      </Button>
                    )}
                  </div>
                </div>

                <Markdown
                  key={item.sub_frq_number}
                  content={`\`\`\`java \n ${item.code}\`\`\``}
                  className={cn(
                    'prose-pre:rounded-t-none',
                    openCode.includes(item.sub_frq_number) ? 'block' : 'hidden'
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Result
