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
  getSortedRowModel,

  //pagination server side
  PaginationState


} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate, useSearchParams } from "react-router-dom"
import { PaginationServer } from "../pagination/pagination-server"
import { Meta } from "@/pages/publishers/shema"
import { useState } from "react"
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


function DataTableComponent<TData, TValue>({ columns, data, meta, pageIndex, pageSize }: DataTableProps<TData, TValue>) {
  const navigate = useNavigate()

  const [sorting, setSorting] = useState<SortingState>([])
  const [, setSearchParams] = useSearchParams([])

  /**
   * pageIndex của TanStack Table LUÔN LUÔN là 0-based
    KHÔNG BAO GIỜ được khởi tạo = 1
   */
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex,
    pageSize
  })
  const pageCount = Math.ceil((meta?.total ?? 0) / pagination.pageSize)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    // pagination server side
    manualPagination: true,  // turn off client-side pagination
    rowCount: meta?.total,  //  Table KHÔNG tự cắt data
    autoResetPageIndex: false, // Phụ thuộc backend trả total
    pageCount,
    onPaginationChange: (updater) => {
      // pagination nếu là hàm nó sẽ trả ra giá trị number nên khi nó là 1 hàm thì set nó vào hàm SetPagination
      // demo => tham chiếu hàm
      // demo() => chạy hàm
      // updater nhận vào state cũ và return ra state mới

      setPagination(objectOld => {
        const newState = typeof updater === 'function' ? updater(objectOld) : updater

        const newPageIndex = (newState.pageIndex) + 1

        setSearchParams((prev) => {
          const params = new URLSearchParams(prev)
          params.set('page', newPageIndex.toString())
          params.set('per_page', newState.pageSize.toString())

          return params
        })
        // nếu updater không phải là hàm thì trả ra giá trị cũ thôi
        return objectOld
      })

    },

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

    // state có nghĩa là table sẽ ko quản lý soring và pagination
    // đối với server side thì pagination thay đổi phải đi qua hàm onPaginationChange và set lại state
    // nếu muốn làm theo client thì ko cần hàm onChange nữa mà để State rỗng table tự quản lý sort filter và pagination
    state: {
      sorting,
      pagination
    },

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
        <PaginationServer table={table} pagination={pagination} pageCount={pageCount} />
      </div>
    </div>
  )
}

export const DataTable = memo(DataTableComponent) as typeof DataTableComponent
