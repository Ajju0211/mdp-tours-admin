"use client"

import * as React from "react"
import type {
  ColumnDef,
  SortingState,
  PaginationState,
  ColumnFiltersState,
} from "@tanstack/react-table"

import { DataTable } from "@/common/data-table"
import type { QueryItem } from "@/types/query"
import { getAllQueries } from "@/api/query/query"
import { QueryDetailsDialog } from "./QueryDetailsDialog"


export default function QueryPage() {
  const [data, setData] = React.useState<QueryItem[]>([])
  const [totalRows, setTotalRows] = React.useState(0)

  const [pagination, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    })

  const [sorting, setSorting] =
    React.useState<SortingState>([])

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])

  const [loading, setLoading] = React.useState(false)

  const [selectedQuery, setSelectedQuery] =
    React.useState<QueryItem | null>(null)

  const [dialogOpen, setDialogOpen] =
    React.useState(false)



  const handleRowClick = (row: QueryItem) => {
    setSelectedQuery(row)
    setDialogOpen(true)
  }

  async function fetchData() {
    try {
      setLoading(true)

      const statusFilter = columnFilters.find(
        (f) => f.id === "status"
      )?.value as string | undefined

      const response = await getAllQueries(
        pagination.pageIndex + 1,
        pagination.pageSize,
        // statusFilter
      )

      setData(response.data)
      setTotalRows(response.total)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [pagination, sorting, columnFilters])


  const columns: ColumnDef<QueryItem>[] = [
    {
      accessorKey: "fullName",
      header: "Full Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "service",
      header: "Service",
    },
    {
      accessorKey: "status",
      header: "Status",
      enableColumnFilter: true,
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },

  ]

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={data}
        manualPagination
       
        totalRows={totalRows}
        pageCount={Math.ceil(totalRows / pagination.pageSize)}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        onRowClick={(row) => {
          setSelectedQuery(row)
          setDialogOpen(true)
        }}
      />
       <QueryDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        query={selectedQuery}
        onStatusUpdate={fetchData}
      />
    </div>
  )
}