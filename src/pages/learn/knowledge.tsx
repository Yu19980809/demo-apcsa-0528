import { ElementRef, useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

import { cn } from '@/lib/utils'
import { apiUrl } from '@/lib/constants'
import { EssentialKnowlwdge } from '@/lib/types'
import Container from '@/components/global/container'
import CodeArea from '@/components/global/code-area'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

const Knowledge = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const index = searchParams.get('index')
  
  const [data, setData] = useState<EssentialKnowlwdge>()

  const textRef = useRef<ElementRef<'div'>>(null)
  const codeRef = useRef<ElementRef<'div'>>(null)
  const resizeRef = useRef(false)

  const [open, setOpen] = useState<boolean>(false)

  const knowledge = {
    id,
    number: '1.1.1',
    description: 'Call System class methods to generate output to the console.',
    text: `
      This is test text. This is test text. This is test text. This is test text. This is test text.
      This is test text. This is test text. This is test text. This is test text. This is test text.
      This is test text. This is test text. This is test text. This is test text. This is test text.
    `
  }

  useEffect(() => {
    const fetchData = async () => {
      // const res = await axios.get(`${apiUrl}/syllabus/essential_knowledge/${id}`)
      const res = await api.get(`/syllabus/essential_knowledge/${id}`)

      if (res?.status === 200 && res?.data) {
        setData(res.data)
      } else {
        toast.error('Failed to fetch data')
        console.log('ERROR_GET_SYLLABUS_ESSENTIAL_KNOWLEDGE', res)
      }
    }

    fetchData()
  }, [id])

  const onCodeClick = () => {
    if (!open) return setOpen(true)

    onWidthReset()
    setOpen(false)
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()

    resizeRef.current = true
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!resizeRef.current) return

    let newWidth = e.clientX

    if (newWidth < 400) newWidth = 400

    console.log('text ref', textRef.current)
    console.log('code ref', codeRef.current)
    if (textRef.current && codeRef.current) {
      textRef.current.style.width = `${newWidth}px`
    }
  }

  const onMouseUp = () => {
    resizeRef.current = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  const onWidthReset = () => {
    if (!textRef.current) return

    textRef.current.style.width = '100%'
  }

  return (
    <div className="h-screen bg-accent">
      <Container className="flex gap-x-1">
        <div
          ref={textRef}
          className={cn(
            'relative flex flex-col gap-y-10 h-screen px-4 py-10',
            open && 'w-1/2'
          )}
        >
          <h1 className="w-full font-semibold text-xl text-center">
            {`${data?.topic_id}.${index!}`} &nbsp;
            {data?.name.replace(/\.$/, '')}
          </h1>

          <p>{knowledge.text}</p>

          <div className="absolute right-6 bottom-16 flex items-center gap-x-2 z-10">
            <Button asChild>
              <Link to="/learn">Back to syllabus</Link>
            </Button>
            
            <Button onClick={onCodeClick}>
              {open ? 'Close code editor' : 'Try to code'}
            </Button>
          </div>
        </div>

        {!!open && (
          <>
            <div
              onMouseDown={onMouseDown}
              className="w-1 h-screen bg-primary/10 transition cursor-ew-resize"
            />

            <div
              ref={codeRef}
              className={cn(
                'px-4 py-10 flex-grow',
                open && 'w-1/2'
              )}
            >
              <CodeArea />
            </div>
          </>
        )}
      </Container>
    </div>
  )
}

export default Knowledge
