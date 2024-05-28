import { ElementRef, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Split from 'react-split'

import { Frq, FrqDescTab, Mode, SubmitCode, SubmitRelated, SubmitScore, TExplanation, TopbarType } from '@/lib/types'
import Code from '@/components/frq/playground/code'
import Topbar from '@/components/global/top-bar'
import Description from '@/components/frq/info/description/description'
import { api } from '@/lib/api'

type Props = {
  mode: Mode
  data?: Frq
}

const FrqTemplate = ({ data, mode }: Props) => {
  const { id } = useParams()

  const [frq, setFrq] = useState<Frq>()
  const [isExplaining, setIsExplaining] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isDescCollapsed, setIsDescCollapsed] = useState<boolean>(false)
  const [activeDescTab, setActiveDescTab] = useState<FrqDescTab>(FrqDescTab.DESCRIPTION)
  const [explanation, setExplanation] = useState<TExplanation[]>()
  // const [submitResult, setSubmitResult] = useState<any>()
  const [submitScore, setSubmitScore] = useState<SubmitScore>()
  const [submitSummary, setSubmitSummary] = useState<string[]>([])
  const [submitRelated, setSubmitRelated] = useState<SubmitRelated>()
  const [submitCode, setSubmitCode] = useState<SubmitCode>()

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      // const res = await axios.get(`/api/frqs/${id}`)
      const res = await api.get(`/frqs/${id}`)
      if (!res) return toast.error('Failed to fetch data')
      setFrq(res.data)
    }

    fetchData()
  }, [id])

  return (
    <div className="h-full bg-accent">
      <Topbar
        type={TopbarType.FRQ}
        mode={mode}
        frqId={frq?.id}
        label={frq?.metadata.name}
        // setSubmitResult={setSubmitResult}
        setSubmitScore={setSubmitScore}
        setSubmitSummary={setSubmitSummary}
        setSubmitRelated={setSubmitRelated}
        setSubmitCode={setSubmitCode}
        setIsMcqFinished={() => {}}
        setIsSubmitting={setIsSubmitting}
        setActiveDescTab={setActiveDescTab}
      />

      <Split
        minSize={400}
        direction="horizontal"
        gutterSize={12}
        cursor="col-resize"
        className="flex w-full h-[calc(100vh-80px)] px-20 py-4"
      >
        <Description
          data={frq}
          // submitResult={submitResult}
          submitScore={submitScore}
          submitSummary={submitSummary}
          submitRelated={submitRelated}
          submitCode={submitCode}
          explanation={explanation}
          isExplaining={isExplaining}
          isSubmitting={isSubmitting}
          isCollapsed={isDescCollapsed}
          activeDescTab={activeDescTab}
          setIsCollapsed={setIsDescCollapsed}
          setActiveDescTab={setActiveDescTab}
        />

        <Code
          data={data}
          isExplaining={isExplaining}
          setExplanation={setExplanation}
          setIsExplaining={setIsExplaining}
          setActiveDescTab={setActiveDescTab}
        />
      </Split>
    </div>
  )
}

export default FrqTemplate
