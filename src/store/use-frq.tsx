import { create } from 'zustand'

import { FrqDescTab } from '@/lib/types'

type Props = {
  id: string | null
  isDescCollapsed: boolean
  isRunning: boolean
  isExplaining: boolean
  isSubmitting: boolean
  activeDescTab: FrqDescTab
  explanation: any
  runResult: any
  submitResult: any
  setId: (id: string) => void
  setIsDescCollapsed: (status: boolean) => void
  setIsRunning: (status: boolean) => void
  setIsExplaining: (status: boolean) => void
  setIsSubmitting: (status: boolean) => void
  setActiveDescTab: (tab: FrqDescTab) => void
  setExplanation: (data: any) => void
  setRunResult: (data: any) => void
  setSubmitResult: (data: any) => void
}

export const useFrq = create<Props>(set => ({
  id: null,
  isDescCollapsed: false,
  isRunning: false,
  isExplaining: false,
  isSubmitting: false,
  activeDescTab: FrqDescTab.DESCRIPTION,
  explanation: null,
  runResult: null,
  submitResult: null,
  setId: id => set(() => ({ id })),
  setIsDescCollapsed: status => set(() => ({ isDescCollapsed: status })),
  setIsRunning: status => set(() => ({ isDescCollapsed: status })),
  setIsExplaining: status => set(() => ({ isDescCollapsed: status })),
  setIsSubmitting: status => set(() => ({ isDescCollapsed: status })),
  setActiveDescTab: tab => set(() => ({ activeDescTab: tab })),
  setExplanation: data => set(() => ({ explanation: data })),
  setRunResult: data => set(() => ({ runResult: data })),
  setSubmitResult: data => set(() => ({ submitResult: data })),
}))
