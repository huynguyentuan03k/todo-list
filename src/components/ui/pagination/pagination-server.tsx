import { PaginationState, Table } from "@tanstack/react-table"
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchParams } from "react-router-dom"

type PaginationServerProps<TData> = {
  table: Table<TData>,
  pagination: PaginationState,

  // React.Dispatch<...> “đây là 1 hàm nhận vào SetStateAction ở trên và không trả về gì và SetStateAction có kiểu PaginationState”
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
  pageCount: number,
}

export function PaginationServer<TData>({ table, pagination, setPagination }: PaginationServerProps<TData>) {

  const [, setSearchParams] = useSearchParams([])

  const handleOnChange = (value: string) => {
    localStorage.setItem('PER_PAGE', value)
    setPagination((prev) => ({
      ...prev,
      pageSize: Number(value),
    }))

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)

      params.set('per_page', value)

      return params;
    })
  }

  return (
    <div className="flex justify-end items-center w-full py-3 px-2 gap-2">

      <span>total items ({table.getRowCount()})</span>
      <button
        className="border rounded-md p-1 cursor-pointer"
        onClick={() => table.firstPage()}
        disabled={pagination.pageIndex === 0}
        aria-label="First page"
      >
        <ChevronsLeft size={18} />
      </button>

      <button
        className="border rounded-md p-1 cursor-pointer"
        onClick={() => {
          table.previousPage();

        }}
        disabled={pagination.pageIndex === 0}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      <span className="text-sm font-medium">
        Page {pagination.pageIndex + 1} of {table.getPageCount()}
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

      <div className="flex items-center gap-2">
        {/**
         *
         * sm:hidden : ẩn từ sm trở lên (>= 640px : 40rem)
         */}
        <div className="hidden sm:block">
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={(value) => handleOnChange(value)}
          >
            <SelectTrigger className="max-w-[150px] max-h-[30px]">
              <SelectValue placeholder="Show Number" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Number</SelectLabel>
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

    </div >
  )
}
