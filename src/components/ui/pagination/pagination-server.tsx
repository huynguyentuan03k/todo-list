import { Table } from "@tanstack/react-table"
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react"
import { Select, SelectItem, SelectValue } from "../select"
import { SelectContent, SelectGroup, SelectLabel, SelectTrigger } from "@radix-ui/react-select"

type PaginationServerProps<TData> = {
  table: Table<TData>
}

export function PaginationServer<TData>({ table }: PaginationServerProps<TData>) {
  return (
    <div className="flex justify-end items-center w-full py-3 px-2">
      <div className="flex items-center gap-2">
        <span>total items ({table.getRowCount()})</span>
        <button
          className="border rounded-md p-1 cursor-pointer"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="First page"
        >
          <ChevronsLeft size={18} />
        </button>

        <button
          className="border rounded-md p-1 cursor-pointer"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <button
          className="border rounded-md p-1 cursor-pointer"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>

        <button
          className="border rounded-md p-1 cursor-pointer"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Last page"
        >
          <ChevronsRight size={18} />
        </button>
        <div>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Show Number" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Place Select Number</SelectLabel>
                {[1, 2, 3, 5, 10, 15, 20].map((item) => (
                  <SelectItem key={item} value={item.toString()}>
                    Show {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
