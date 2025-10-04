import { Button } from "@/components/ui/button"
interface props {
  table: any
}
export function Pagination({ table }: props) {
  const totalPage = Math.ceil(
    table.getFilteredRowModel().rows.length / table.getState().pagination.pageSize
  )
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <span>
        Page {table.getState().pagination.pageIndex + 1} of {totalPage}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  )
}
