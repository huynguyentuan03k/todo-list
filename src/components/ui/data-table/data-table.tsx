import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  // import filter state
  ColumnFiltersState,
  getFilteredRowModel,
  // import sorting
  SortingState,
  getSortedRowModel
  //pagination server side

} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate, useSearchParams } from "react-router-dom"
import { PaginationServer } from "../pagination/pagination-server"
import { Meta } from "@/pages/publishers/shema"
import { useEffect, useState } from "react"
import { memo } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  meta?: Meta,
  fieldTitle: string,
  onSortChange?: (sorting: SortingState) => void,
  pageIndex: number,
  pageSize: number,
}


function DataTableComponent<TData, TValue>({ columns, data, meta, fieldTitle, onSortChange, pageIndex, pageSize }: DataTableProps<TData, TValue>) {
  const navigate = useNavigate()
  const [sorting, setSorting] = useState<SortingState>([])
  const [, setSearchParams] = useSearchParams([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    // pagination server side
    manualPagination: true,  // turn off client-side pagination
    rowCount: meta?.total,  //  Table KHÔNG tự cắt data
    autoResetPageIndex: false, // Phụ thuộc backend trả total


    // sort server side,
    // LƯU Ý ;  updater là 1 type nó sẽ biến thành cái gì ,
    onSortingChange: (updater) => {
      if (typeof updater === 'function') {
        setSorting(updater)
        setSearchParams((pre) => {
          const params = new URLSearchParams(pre)
          const nextSorting = updater(sorting)
          params.set('sort', nextSorting[0].desc === true ? "-id" : 'id')
          
          return params
        })
      }
    },

    manualSorting: true,

    state: {
      sorting,
    },

    initialState: {
      pagination: {
        pageIndex: pageIndex,
        pageSize: pageSize
      }
    }

  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="cursor-pointer" onClick={() => navigate(`${(row.original as any).id}/show`)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <PaginationServer table={table} />
      </div>
    </div>
  )
}

export const DataTable = memo(DataTableComponent) as typeof DataTableComponent
