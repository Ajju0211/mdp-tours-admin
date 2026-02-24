// "use client"

// import * as React from "react"
// import type {
//   ColumnDef,
//   SortingState,
//   PaginationState,
//   ColumnFiltersState,
// } from "@tanstack/react-table"
// import { DataTable } from "@/common/data-table"


// type Package = {
//   id: string
//   title: string
//   destinationName: string
//   pricePerPerson: number
//   category: string
//   isActive: boolean
// }

// export default function PackagePage() {
//   const [data, setData] = React.useState<Package[]>([])
//   const [totalRows, setTotalRows] = React.useState(0)

//   const [pagination, setPagination] =
//     React.useState<PaginationState>({
//       pageIndex: 0,
//       pageSize: 10,
//     })

//   const [sorting, setSorting] =
//     React.useState<SortingState>([])

//   const [columnFilters, setColumnFilters] =
//     React.useState<ColumnFiltersState>([])

//   React.useEffect(() => {
//     async function fetchData() {
//       const response = await fetch("/api/packages")
//       const json = await response.json()

//       setData(json.data)
//       setTotalRows(json.total)
//     }

//     fetchData()
//   }, [pagination, sorting, columnFilters])

//   const columns: ColumnDef<Package>[] = [
//     {
//       accessorKey: "title",
//       header: "Title",
//     },
//     {
//       accessorKey: "destinationName",
//       header: "Destination",
//     },
//     {
//       accessorKey: "pricePerPerson",
//       header: "Price",
//     },
//     {
//       accessorKey: "category",
//       header: "Category",
//     },
//     {
//       accessorKey: "isActive",
//       header: "Active",
//       cell: ({ row }) =>
//         row.original.isActive ? "Yes" : "No",
//     },
//   ]

//   return (
//     <div className="p-6">
//       <DataTable
//         columns={columns}
//         data={data}
//         totalRows={totalRows}
//         manualPagination
//         manualSorting
//         manualFiltering
//         pagination={pagination}
//         onPaginationChange={setPagination}
//         sorting={sorting}
//         onSortingChange={setSorting}
//         columnFilters={columnFilters}
//         onColumnFiltersChange={setColumnFilters}
//       />
//     </div>
//   )
// }


"use client"

import * as React from "react"
import type {
  ColumnDef,
  SortingState,
  PaginationState,
  ColumnFiltersState,
} from "@tanstack/react-table"
import { DataTable } from "@/common/data-table"

type Package = {
  id: string
  title: string
  destinationName: string
  pricePerPerson: number
  category: string
  isActive: boolean
}

export default function PackagePage() {
  // ✅ Dummy Data
  const mockData: Package[] = [
    {
      id: "1",
      title: "Goa Beach Escape",
      destinationName: "Goa",
      pricePerPerson: 8999,
      category: "Beach",
      isActive: true,
    },
    {
      id: "2",
      title: "Manali Snow Adventure",
      destinationName: "Manali",
      pricePerPerson: 12999,
      category: "Mountain",
      isActive: true,
    },
    {
      id: "3",
      title: "Rajasthan Royal Tour",
      destinationName: "Jaipur",
      pricePerPerson: 15999,
      category: "Heritage",
      isActive: false,
    },
    {
      id: "4",
      title: "Kerala Backwaters",
      destinationName: "Alleppey",
      pricePerPerson: 10999,
      category: "Nature",
      isActive: true,
    },
    {
      id: "5",
      title: "Kashmir Paradise",
      destinationName: "Srinagar",
      pricePerPerson: 17999,
      category: "Mountain",
      isActive: false,
    },
    {
      id: "6",
      title: "Andaman Island Trip",
      destinationName: "Andaman",
      pricePerPerson: 19999,
      category: "Beach",
      isActive: true,
    },
  ]

  const [data] = React.useState<Package[]>(mockData)

  const [pagination, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 5,
    })

  const [sorting, setSorting] =
    React.useState<SortingState>([])

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])

  const columns: ColumnDef<Package>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "destinationName",
      header: "Destination",
    },
    {
      accessorKey: "pricePerPerson",
      header: "Price",
      cell: ({ row }) => `₹ ${row.original.pricePerPerson}`,
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) =>
        row.original.isActive ? "Yes" : "No",
    },
  ]

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={data}

        pagination={pagination}
        onPaginationChange={setPagination}

        sorting={sorting}
        onSortingChange={setSorting}

        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
      />
    </div>
  )
}