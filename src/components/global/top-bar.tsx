import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import {
  AlarmClockCheck,
  ChevronLeft,
  CirclePause,
  CirclePlay,
  RotateCcw,
  SendHorizonal,
} from 'lucide-react'

import logo from '@/assets/react.svg'
import { FrqDescTab, Mode, SubmitCode, SubmitRelated, SubmitScore, TopbarType } from '@/lib/types'
import { apiUrl, examMcqTimeLimit } from '@/lib/constants'
import { ModeToggle } from './mode-toggle'
import AlertModal from '@/components/modals/alert-modal'
import UserButton from '@/components/layout/navbar/user-button'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { Hint } from '@/components/ui/hint'
import { api } from '@/lib/api'

type Props = {
  type: TopbarType
  mode: Mode
  frqId?: string
  label?: string
  isMcqFinished?: boolean
  // setSubmitResult?: React.Dispatch<any>
  setSubmitScore?: React.Dispatch<SubmitScore>
  setSubmitSummary?: React.Dispatch<string[]>
  setSubmitRelated?: React.Dispatch<SubmitRelated>
  setSubmitCode?: React.Dispatch<SubmitCode>
  setIsMcqFinished?: React.Dispatch<boolean>
  setIsSubmitting?: React.Dispatch<boolean>
  setActiveDescTab?: React.Dispatch<FrqDescTab>
}

const Topbar = ({
  type,
  mode,
  frqId,
  label,
  isMcqFinished,
  // setSubmitResult,
  setSubmitScore,
  setSubmitSummary,
  setSubmitRelated,
  setSubmitCode,
  setIsMcqFinished,
  setIsSubmitting,
  setActiveDescTab
}: Props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  // const { setIsSubmitting, setActiveDescTab, setSubmitResult } = useFrq()
  let timer: any

  const [timerSeconds, setTimerSeconds] = useState<number>(0)
  const [timeLimit, setTimeLimit] = useState<number>(examMcqTimeLimit)
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false)
  const [isTimerShow, setIsTimerShow] = useState<boolean>(mode === Mode.EXAM ? true : false)
  const [isTimerHide, setIsTimerHide] = useState<boolean>(false)
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false)
  const [isStarred, setIsStarred] = useState<boolean>(false)
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (mode !== Mode.EXAM) return
    clearInterval(timer)

    timer = setInterval(() => setTimeLimit(prev => {
      if (prev - 1 === 0) setIsTimeOut(true)
      return prev - 1
    }), 1000)
  }, [])

  useEffect(() => {
    if (!isTimeOut) return
    setIsAlertOpen(true)
    // setIsMcqFinished(true)
  }, [isTimeOut])

  // useEffect(() => clearInterval(0), [isMcqFinished])

  const onClockClick = () => {
    setIsTimerShow(true)
    if (mode === Mode.EXAM) return

    setIsTimerPaused(false)
    timer = setInterval(() => setTimerSeconds(prev => prev + 1), 1000)
  }

  const onTimerReset = () => {
    setIsTimerPaused(false)
    setTimerSeconds(0)
  }

  const onTimerPause = () => {
    if (!isTimerPaused) {
      setIsTimerPaused(true)
      clearInterval(timer)
      timer = null
    } else {
      if (timer) clearInterval(timer)
      setIsTimerPaused(false)
      timer = setInterval(() => setTimerSeconds(prev => prev + 1), 1000)
    }
  }

  const onTimerHide = () => {
    setIsTimerHide(true)
    setIsTimerShow(false)
  }

  const onStar = () => {
    if (isStarred) {
      // TODO: delete star history in database
      console.log('id', id)
      setIsStarred(false)
      toast.success('Cancel star success')
    } else {
      // TODO: create star history in database
      console.log('id', id)
      setIsStarred(true)
      toast.success('Star success')
    }
  }

  const onContinue = () => {
    setIsLoading(true)

    // TODO: Record all mcq questions with status

    navigate(`/exam/${id}/frq`)
    setIsLoading(false)
  }

  const onSubmit = async () => {
    if (
      !setIsSubmitting ||
      !setActiveDescTab ||
      !setSubmitScore ||
      !setSubmitSummary ||
      !setSubmitCode ||
      !setSubmitRelated
    ) return

    setIsLoading(true)
    setIsSubmitting(true)
    setActiveDescTab(FrqDescTab.RESULT)

    const code = JSON.parse(localStorage.getItem('code') || '{}')
    const data = { frq_id: frqId, submission: code }
    const ctrl = new AbortController()

    // const res = await axios.post(`${apiUrl}/submission`, data)

    const res = await api.post('/submission', data)
    setIsSubmitting(false)
    setIsLoading(false)
    if (!res) return toast.error('Something went wrong')
    setSubmitScore(res.data.score)
    setSubmitCode(res.data.submission_code)
    setSubmitRelated(res.data.keynotes)

    fetchEventSource(`${apiUrl}/submission/summary?frq_id=${frqId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token') || ''
      },
      // body:JSON.stringify(data),
      openWhenHidden: true,
      signal: ctrl.signal,
      onopen: async (res) => {
        console.log('onopen', res)
        setIsLoading(false)
        setIsSubmitting(false)
      },
      onmessage: msg => {
        if (msg.event === 'empty_run' || msg.event === 'end') return
        // @ts-ignore
        setSubmitSummary(prev => [...prev, msg.data])
      },
      onclose: () => {
        console.log('onclose')
      },
      onerror: err => {
        console.log('ERROR_SUBMIT', err)
        ctrl.abort()
      }
    })
  }

  return (
    <>
      <AlertModal
        title="Timeout!!!"
        description="Timeout!!! All answers will be submitted, cick continue to FRQ page."
        open={isAlertOpen}
        disabled={isLoading}
        setOpen={setIsAlertOpen}
        onContinue={onContinue}
      />

      <nav className="flex justify-center items-center w-full h-20 border-b">
        <div className="flex justify-between items-center w-full md:px-20 px-4">
          <div className="flex items-center gap-x-1">
            <img
              src={logo}
              alt="Logo"
              width={32}
              height={32}
              onClick={() => navigate('/')}
              className="rounded-full cursor-pointer"
            />

            <span>{label}</span>
          </div>

          <div className="flex items-center md:gap-x-4 gap-x-2">
            {!isTimerShow && (
              <Button variant="outline" size="icon" onClick={onClockClick}>
                <Hint
                  asChild
                  label={isTimerHide ? 'Show the clock' : 'Start the clock'}
                  side="bottom"
                  align="center"
                >
                  <AlarmClockCheck className="w-5 h-5" />
                </Hint>
              </Button>
            )}

            {isTimerShow && (
              <div className="flex items-center gap-x-1">
                <Button
                  onClick={onTimerHide}
                  variant="outline"
                  size="icon"
                >
                  <Hint asChild label="Hide" side="bottom" align="center">
                    <ChevronLeft className="w-5 h-5" />
                  </Hint>
                </Button>

                <Button
                  onClick={onTimerPause}
                  variant="outline"
                  className="h-10 px-4"
                  disabled={mode === Mode.EXAM}
                >
                  <div className="flex items-center gap-x-2">
                    {isTimerPaused ? (
                      <CirclePlay className="w-5 h-5" />
                    ) : (
                      <CirclePause className="w-5 h-5" />
                    )}

                    <span>
                      {new Date((mode === Mode.EXAM ? timeLimit : timerSeconds) * 1000).toISOString().substring(11, 19)}
                    </span>
                  </div>
                </Button>

                <Button
                  onClick={onTimerReset}
                  variant="outline"
                  size="icon"
                  disabled={mode === Mode.EXAM}
                >
                  <Hint asChild label="Reset" side="bottom" align="center">
                    <RotateCcw className="w-5 h-5" />
                  </Hint>
                </Button>
              </div>
            )}

            {type === TopbarType.FRQ && (
              <>
                <Button variant="outline" size="icon" onClick={onStar}>
                  <Hint
                    asChild
                    label={isStarred ? 'Cancel star' : 'Star current question'}
                    side="bottom"
                    align="center"
                  >
                    <div>
                      {!isStarred && <FaRegStar className="w-5 h-5" />}
                      {!!isStarred && <FaStar className="w-5 h-5 text-yellow-500" />}
                    </div>
                  </Hint>
                </Button>

                <Button variant="outline" size="icon" onClick={onSubmit}>
                  <Hint
                    asChild
                    label="Submit all code"
                    side="bottom"
                    align="center"
                  >
                    {isLoading ? <Loader /> : <SendHorizonal className="w-5 h-5" />}
                  </Hint>
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center md:gap-x-4 gap-x-2">
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Topbar
