import { Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface DataTablePaginationProps<TData> {
  table: Table<TData>
  totlaRows?: number
  isServerSide?: boolean
  onPageChange?: (page: number) => void
  currentPage?: number
  hasNextPage?: boolean
  onPageSizeChange?: (pageSize: number) => void
}

export function DataTablePagination<TData>({
  table,
  totlaRows,
  isServerSide = false,
  onPageChange,
  currentPage: serverCurrentPage,
  hasNextPage,
  onPageSizeChange,
}: DataTablePaginationProps<TData>) {

  const currentPage = isServerSide ? (serverCurrentPage || 1) : table.getState().pagination.pageIndex + 1;
  const pageSize = table.getState().pagination.pageSize;
  const totalPages = table.getPageCount();

  const getDisplayValues = () => {
    if (isServerSide && totlaRows !== undefined) {
      const startRow = (currentPage - 1) * pageSize + 1;
      const endRow = Math.min(currentPage * pageSize, totlaRows);
      return {
        showing: `${startRow}-${endRow} of ${totlaRows}`,
        selectedInfo: `${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected.`
      }
    } else {
      return {
        showing: `Page ${currentPage} of ${totalPages}`,
        selectedInfo: `${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected.`
      }
    }
  };
  const { showing, selectedInfo } = getDisplayValues();
  
  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-muted-foreground flex-1 text-sm">
        {isServerSide ? (
          <div className="flex flex-col gap-1">
            <span>Showing {showing} rows</span>
            <span className="text-xs">{selectedInfo}</span>
          </div>
        ) : (
          selectedInfo
        )}
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              const newPageSize = Number(value)
              table.setPageSize(newPageSize)
              if (isServerSide && onPageSizeChange) {
                onPageSizeChange(newPageSize)
              }
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50, 100].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages === -1 ? '...' : totalPages}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => isServerSide ? onPageChange?.(1) : table.setPageIndex(0)}
            disabled={isServerSide ? currentPage === 1 : !table.getCanPreviousPage()}
            title="Go to first page"
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => isServerSide ? onPageChange?.(currentPage - 1) : table.previousPage()}
            disabled={isServerSide ? currentPage === 1 : !table.getCanPreviousPage()}
            title="Go to previous page"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => isServerSide ? onPageChange?.(currentPage + 1) : table.nextPage()}
            disabled={isServerSide ? !hasNextPage : !table.getCanNextPage()}
            title="Go to next page"
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => isServerSide ? onPageChange?.(Math.ceil((totlaRows || 0) / pageSize)) : table.setPageIndex(totalPages - 1)}
            disabled={isServerSide ? !hasNextPage : (!table.getCanNextPage() || totalPages === -1)}
            title="Go to last page"
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
