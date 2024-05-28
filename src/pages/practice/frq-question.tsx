import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

import { Frq, Mode } from '@/lib/types'
import FrqTemplate from '@/components/frq/question'
import { api } from '@/lib/api'

const FrqQuestion = () => {
  const { id } = useParams()

  const [frq, setFrq] = useState<Frq>()

  useEffect(() => {
    const fetchData = async () => {
      // const res = await axios.get(`/api/frqs/${id}`)
      const res = await api.get(`/frqs/${id}`)

      if (res?.status === 200 && res?.data) {
        setFrq(res.data)
      } else {
        toast.error('Failed to fetch data')
        console.log('ERROR_GET_FRQ', res)
      }
    }

    fetchData()
  }, [id])

  return (
    <FrqTemplate data={frq} mode={Mode.PRACTICE} />
  )
}

export default FrqQuestion
