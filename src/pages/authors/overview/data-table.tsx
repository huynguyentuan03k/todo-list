import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Authors, Author, Meta } from "../shema"
import { useNavigate } from "react-router-dom"
import { PaginationServer } from "@/components/ui/pagination/pagination-server"
import { useSearchParams } from "react-router-dom"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"

type props = {
  data: Authors
  columns: ColumnDef<Author>[],
  meta?: Meta
}
export function DataTable({ data, columns, meta }: props) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const per_page = Number(searchParams.get('per_page') ?? 10)
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: per_page
  })
  const pageCount = Math.ceil((meta?.total ?? 0) / pagination.pageSize)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(), // not needed for server-side pagination
    manualPagination: true,
    rowCount: meta?.total,
    onPaginationChange: setPagination, // updat the pagination state when internal APIs mutate the pagination state
    autoResetPageIndex: false,
    autoResetAll: false,
    state: {
      pagination
    },
    //
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Breadcrumbs />
        <Button variant="default" className="ml-auto bg-blue-500 hover:bg-blue-700" onClick={() => navigate(`/portal/authors/create`)}>New</Button>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} >

                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => navigate(`/portal/authors/${row.original.id}/show`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationServer table={table} pagination={pagination} pageCount={pageCount} />
    </div>
  )
}
