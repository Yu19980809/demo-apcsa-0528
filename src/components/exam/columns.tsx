'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Difficulty, Exam } from '@/lib/types'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { cn } from '@/lib/utils'

export const columns: ColumnDef<Exam>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'year',
    header: 'Year',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    // cell: ({ row }) => (row.original.metadata.name)
  },
  // {
  //   accessorKey: 'topicName',
  //   header: 'Topic',
  // },
  // {
  //   accessorKey: 'subTopic',
  //   header: 'Sub Topic',
  // },
  {
    accessorKey: 'difficulty',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulty" />
    ),
    cell: ({ row }) => (
      <span className={cn(
        'p-2 rounded-md bg-yellow-500 text-white',
        row.original.difficulty === Difficulty.EASY && 'bg-emerald-500',
        row.original.difficulty === Difficulty.HARD && 'bg-rose-500'
      )}>
        {row.original.difficulty}
      </span>
    )
  }
]