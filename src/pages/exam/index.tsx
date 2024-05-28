import { useEffect, useState } from 'react'

import { Difficulty, Exam } from '@/lib/types'
import Navbar from '@/components/layout/navbar'
import Container from '@/components/global/container'
import { columns } from '@/components/exam/columns'
import { DataTable } from '@/components/exam/data-table'

const ExamTable = () => {
  const [exams, setExams] = useState<Exam[]>([])

  useEffect(() => {
    // TODO: Fetch data by axios.get
    const data = [
      {
        id: '1',
        name: 'Exam 1',
        year: '2023',
        difficulty: Difficulty.EASY
      }
    ]

    setExams(data)
  }, [])

  return (
    <div className="h-full">
      <Navbar />

      <Container className="h-[calc(100vh-80px)]">
        <div className="py-10">
          <DataTable columns={columns} data={exams} />
        </div>
      </Container>
    </div>
  )
}

export default ExamTable
