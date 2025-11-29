"use client"
import { Button } from "@/components/ui/button"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
    SortingState,
      VisibilityState,
    getPaginationRowModel,
      getSortedRowModel,
        ColumnFiltersState,
          getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTablePagination } from "./DataTablePagination"
import { DataTableViewOptions } from "./DataTableViewOptions"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  totalRows?: number
  isServerSide?: boolean
  onPageChange?: (page: number) => void
  currentPage?: number
  hasNextPage?: boolean
  onPageSizeChange?: (pageSize: number) => void
  pageSize?: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalRows,
  isServerSide = false,
  onPageChange,
  currentPage,
  hasNextPage,
  onPageSizeChange,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {

      const [sorting, setSorting] = React.useState<SortingState>([])
        const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
    const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
      const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
            onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
    state: {
      sorting,
            columnFilters,
                  columnVisibility,
                        rowSelection,
      globalFilter,
    },
  })

  React.useEffect(() => {
    if (isServerSide) {
      table.setPageSize(pageSize)
    }
  }, [pageSize, isServerSide])

  return (
        <div className="bg-white px-10 py-10">
                  <div className="flex items-center py-4">
        <Input
          placeholder="Search users..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) =>
            table.setGlobalFilter(event.target.value)
          }
          className="max-w-sm bg-white text-gray-900 border-gray-300"
        />
<DataTableViewOptions table={table} />
      </div>
    <div className="overflow-hidden rounded-md border border-gray-200">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
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
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-gray-900">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

<DataTablePagination 
        table={table} 
        totlaRows={totalRows} 
        isServerSide={isServerSide}
        onPageChange={onPageChange}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}