import { create } from 'zustand'

type Props = {
  callbackUrl: string | null
  setCallbackUrl: (url: string | null) => void
}

const useCallbackUrl = create<Props>(set => ({
  callbackUrl: null,
  setCallbackUrl: url => set({ callbackUrl: url })
}))

export default useCallbackUrl
