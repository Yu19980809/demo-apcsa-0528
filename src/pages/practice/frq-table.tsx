import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

import { FrqItem } from '@/lib/types'
import { apiUrl } from '@/lib/constants'
import Navbar from '@/components/layout/navbar'
import { columns } from '@/components/frq/table/columns'
import { DataTable } from '@/components/frq/table/data-table'
import Container from '@/components/global/container'
import { api } from '@/lib/api'

const FrqTable = () => {
  const [frqs, setFrqs] = useState<FrqItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      // const res = await axios.get(`${apiUrl}/frqs`)
      const res = await api.get('/frqs')

      if (res?.status === 200 && res?.data) {
        const temp = res.data.map((item: any) => {
          return {
            id: item.id,
            ...item.metadata
          }
        })
        setFrqs(temp)
      } else {
        toast.error('Failed to fetch data')
        console.log('ERROR_GET_FRQS', res)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="h-full">
      <Navbar />

      <Container className="h-[calc(100vh-80px)]">
        <div className="py-10">
          <DataTable columns={columns} data={frqs} />
        </div>
      </Container>
    </div>
  )
}

export default FrqTable
