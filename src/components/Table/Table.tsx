import {
  ColumnDef,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import { Icon, Icons } from 'components'
import { cn } from 'utils/helpers'

export interface Column<T> {
  id: string
  header?: React.ReactNode
  render?: (row: T) => React.ReactNode
  hidden?: boolean
  textAlign?: 'left' | 'center' | 'right'
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  getRowId?: (row: T) => string
  getSubRows?: (row: T) => T[]
  groupBy?: keyof T
  enableSubRows?: boolean
}

const Table = <T,>({
  data,
  columns,
  getRowId,
  getSubRows,
  groupBy,
  enableSubRows
}: TableProps<T>) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columnDefinition = columns.map<ColumnDef<T>>((column) => ({
    accessorKey: column.id,
    id: column.id,
    header: () => column.header,
    enableHiding: column.hidden,
    cell: (cell) => {
      if (column.render) {
        return column.render(cell.row.original)
      }
      return cell.getValue() as React.ReactNode
    }
  }))

  const table = useReactTable({
    data,
    state: {
      rowSelection
    },
    columns: columnDefinition,
    getSubRows: getSubRows,
    getCoreRowModel: getCoreRowModel<T>(),
    getRowId,
    enableExpanding: enableSubRows,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onRowSelectionChange: setRowSelection,
    autoResetExpanded: !groupBy
  })

  useEffect(() => {
    if (groupBy) {
      table.setGrouping([groupBy as string])
      table.toggleAllRowsExpanded()
    }
  }, [groupBy])

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, index) => (
                <td
                  key={cell.id}
                  className={cn({
                    ['bg-base-200']: row.depth > 0
                  })}
                >
                  {row.getCanExpand() && index === 0 ? (
                    <button
                      onClick={row.getToggleExpandedHandler()}
                      className={cn('flex items-center gap-1', {
                        ['link link-primary']:
                          index === 0 && row.getCanExpand(),
                        ['ml-6']: index === 0 && row.depth > 0
                      })}
                    >
                      {index === 0 && row.getCanExpand() && (
                        <Icon
                          className="size-5"
                          icon={
                            row.getIsExpanded()
                              ? Icons.ArrowDown
                              : Icons.ArrowRight
                          }
                        />
                      )}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </button>
                  ) : (
                    <div
                      className={cn({
                        ['ml-6']: row.depth > 0 && index === 0
                      })}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
