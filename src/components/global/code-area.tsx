import { ElementRef, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  showExplain?: boolean
  showSubmit?: boolean
  methods?: number
}

const CodeArea = ({
  showExplain = false,
  showSubmit = false,
  methods = 0
}: Props) => {
  const editorRef = useRef<ElementRef<'div'>>(null)
  const resultRef = useRef<ElementRef<'div'>>(null)
  const resizeRef = useRef(false)

  const [resultHeight, setResultHeight] = useState<number>(200)
  const [activeMthod, setActiveMethod] = useState<number>(0)

  useEffect(() => {
    if (!resultRef.current) return

    setResultHeight(resultRef.current.clientHeight)
  }, [])

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()

    resizeRef.current = true
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!resizeRef.current) return

    let newHeight = e.clientY
    const pageHeight = document.body.clientHeight

    if (newHeight < 300) newHeight = 300
    // TODO: solve scroll bar issue
    if (newHeight > (pageHeight - resultHeight -50)) newHeight = pageHeight - resultHeight -50

    console.log('editor ref', editorRef.current)
    console.log('result ref', resultRef.current)
    if (editorRef.current && resultRef.current) {
      editorRef.current.style.height = `${newHeight}px`
    }
  }

  const onMouseUp = () => {
    resizeRef.current = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  return (
    <div className="flex flex-col gap-y-1 h-full">
      <div className="relative w-full h-3/4">
        {!!methods && methods !== 0 && (
          <div className="flex items-center">
            {[...Array(3)].map((_, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setActiveMethod(index)}
                className={cn(activeMthod === index && 'bg-accent')}
              >
                Method {index + 1}
              </Button>
            ))}
          </div>
        )}

        <div ref={editorRef} className="h-full rounded-md border">
          {!methods && 'Code Editor'}
          {!!methods && methods !== 0 && activeMthod === 0 && 'Method 1'}
          {!!methods && methods !== 0 && activeMthod === 1 && 'Method 2'}
          {!!methods && methods !== 0 && activeMthod === 2 && 'Method 3'}
        </div>

        <Button className="absolute right-4 bottom-4">
          Run
        </Button>
      </div>

      <div
        onMouseDown={onMouseDown}
        className="w-full h-1 rounded-md bg-primary/10 transition cursor-ns-resize"
      />

      <div
        ref={resultRef}
        className="flex-grow w-full min-h-[200px] rounded-md border"
      >
        Run Result {showSubmit}{showExplain}
      </div>
    </div>
  )
}

export default CodeArea