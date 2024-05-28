import { useEffect, useState } from 'react'
import { TbCodeDots } from 'react-icons/tb'
import { Copy, CheckCheck, Shrink, Expand } from 'lucide-react'

import { Solution } from '@/lib/types'
import Markdown from '@/components/global/markdown'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  data: Solution[]
}

const Solutions = ({ data }: Props) => {
  const [copiedSolution, setCopiedSolution] = useState<string | null>(null)
  const [openCode, setOpenCode] = useState<string[]>([])
  console.log('openCode', openCode)

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

  useEffect(() => {
    const temp = data.map(item => item.class_name)
    setOpenCode(prev => [...prev, ...temp])
  }, [data])

  return (
    <div className="flex flex-col gap-y-4 px-6 py-4">
      {data.map(item => (
        <div className="relative flex flex-col">
          <div className="flex justify-between items-center px-2 h-12 rounded-t-md bg-black/5 dark:bg-white/10">
            <div className="flex items-center gap-x-2 text-muted-foreground">
              <TbCodeDots className="w-5 h-5" />
              <span>{item.class_name}.java</span>
            </div>

            {/* <Button
              onClick={() => onCopy(item.class_name, item.content)}
              variant="ghost"
              size="sm"
            >
              {copiedSolution === item.class_name ? (
                <CheckCheck className="w-4 h-4 transition hover:scale-110" />
              ) : (
                <Copy className="w-4 h-4 transition hover:scale-110" />
              )}
            </Button> */}

            {/* <div className="flex items-center"> */}
            <div className={cn(
              'flex justify-between items-center rounded-md',
              openCode.includes(item.class_name) && 'rounded-b-none'
            )}>
              <Button
                onClick={() => onCopy(item.class_name, item.content)}
                variant="ghost"
                size="sm"
              >
                {copiedSolution === item.class_name ? (
                  <CheckCheck className="w-4 h-4 transition hover:scale-110" />
                ) : (
                  <Copy className="w-4 h-4 transition hover:scale-110" />
                )}
              </Button>

              {openCode.includes(item.class_name) ? (
                <Button variant="ghost" size="sm" onClick={() => onCollapse(item.class_name)}>
                  <Shrink className="w-4 h-4 hover:scale-110" />
                </Button>
              ) : (
                <Button
                  onClick={() => setOpenCode(prev => [...prev, item.class_name])}
                  variant="ghost"
                  size="sm"
                >
                  <Expand className="w-4 h-4 hover:scale-110" />
                </Button>
              )}
            </div>
          </div>

          <Markdown
            key={item.class_name}
            content={`\`\`\`java \n${item.content}\`\`\``}
            // className="prose-pre:rounded-t-none"
            className={cn(
              'prose-pre:rounded-t-none',
              openCode.includes(item.class_name) ? 'block' : 'hidden'
            )}
          />
        </div>
      ))}
    </div>
  )
}

export default Solutions
