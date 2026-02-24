"use client"

import * as React from "react"

import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
} from "@tanstack/react-table"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]

  totalRows?: number
  pageCount?: number
  manualPagination?: boolean
  manualSorting?: boolean
  manualFiltering?: boolean

  pagination?: PaginationState
  onPaginationChange?: (updater: any) => void

  sorting?: SortingState
  onSortingChange?: (updater: any) => void

  columnFilters?: ColumnFiltersState
  onColumnFiltersChange?: (updater: any) => void

  // 🔥 ADD THIS
  onRowClick?: (row: TData) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalRows,
  pageCount,
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  pagination = { pageIndex: 0, pageSize: 10 },
  onPaginationChange = () => {},
  sorting = [],
  onSortingChange = () => {},
  columnFilters = [],
  onColumnFiltersChange = () => {},
  onRowClick, // 🔥 ADD HERE
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
      columnVisibility,
      globalFilter,
    },

    onSortingChange,
    onColumnFiltersChange,
    onPaginationChange,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,

    manualPagination,
    manualSorting,
    manualFiltering,
    pageCount,

    getCoreRowModel: getCoreRowModel(),

    // Enable client-side logic only when not manual
    getFilteredRowModel: manualFiltering
      ? undefined
      : getFilteredRowModel(),

    getSortedRowModel: manualSorting
      ? undefined
      : getSortedRowModel(),

    getPaginationRowModel: manualPagination
      ? undefined
      : getPaginationRowModel(),
  })

  return (
    <div className="space-y-4">

      {/* ================= TOP CONTROLS ================= */}
      <div className="flex items-center justify-between gap-4">
        {/* Global Search */}
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />

        {/* Column Visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ================= TABLE ================= */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>

                {/* Header Row */}
                <TableRow>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>

                {/* Column Filter Row */}
                <TableRow>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={`${header.id}-filter`}>
                      {header.column.getCanFilter() ? (
                        <Input
                          placeholder="Filter..."
                          value={
                            (header.column.getFilterValue() ?? "") as string
                          }
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                          className="h-8"
                        />
                      ) : null}
                    </TableHead>
                  ))}
                </TableRow>

              </React.Fragment>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                 <TableRow
  key={row.id}
  onClick={() => onRowClick?.(row.original)}   // 👈 THIS WAS MISSING
  className={`hover:bg-muted/50 transition ${
    onRowClick ? "cursor-pointer" : ""
  }`}
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
                  className="text-center py-10"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex items-center justify-between">

        <div className="text-sm text-muted-foreground">
          {manualPagination
            ? `Total: ${totalRows ?? 0}`
            : `Page ${pagination.pageIndex + 1} of ${table.getPageCount()}`}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.pageIndex === 0}
            onClick={() =>
              onPaginationChange({
                ...pagination,
                pageIndex: pagination.pageIndex - 1,
              })
            }
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={
              manualPagination
                ? pagination.pageIndex + 1 >= (pageCount ?? 0)
                : pagination.pageIndex + 1 >= table.getPageCount()
            }
            onClick={() =>
              onPaginationChange({
                ...pagination,
                pageIndex: pagination.pageIndex + 1,
              })
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}