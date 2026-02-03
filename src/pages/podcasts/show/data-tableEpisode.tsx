import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
  // pagination client
  getPaginationRowModel
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Episodes, Episode, Meta } from "@/pages/episodes/shema"
import { useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import { PaginationClient } from "@/components/ui/pagination/pagination-client"

type props = {
  data: Episodes
  columns: ColumnDef<Episode>[],
  meta?: Meta
}

export function DataTableEpisode({ data, columns, meta }: props) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const per_page = Number(searchParams.get('per_page') ?? 10)

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: per_page
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    // pagination client
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination, // updat the pagination state when internal APIs mutate the pagination state

    state: {
      pagination
    },
    //
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="w-full">
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
                  onClick={() => navigate(`/portal/episodes/${row.original.id}/show`)}
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
      <PaginationClient table={table} />
    </div>
  )
}
