"use client";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, createColumnHelper } from "@tanstack/react-table";
import  type { Query } from "@/types/query";

const columnHelper = createColumnHelper<Query>();

export const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.accessor("phone", { header: "Phone" }),
  columnHelper.accessor("service", { header: "Service" }),
  columnHelper.accessor("status", { header: "Status" }),
  columnHelper.accessor("message", { header: "Message" }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: info => new Date(info.getValue()).toLocaleString(),
  }),
];

interface TableProps {
  data: Query[];
  filters: {
    search: string;
    service: string;
    status: string;
    fromDate?: string;
    toDate?: string;
  };
}

export default function useQueriesTable(data: Query[], filters: TableProps["filters"]) {
  const table = useReactTable({
    data,
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
    },
    filterFns: {
      service: (row, columnId, value) => value === "All" || row.getValue(columnId) === value,
      status: (row, columnId, value) => value === "All" || row.getValue(columnId) === value,
      createdAt: (row, columnId, range: { from?: string; to?: string }) => {
        const date = new Date(row.getValue(columnId));
        const from = range.from ? new Date(range.from) : null;
        const to = range.to ? new Date(range.to) : null;
        if (from && date < from) return false;
        if (to && date > to) return false;
        return true;
      },
    },
  });

  return table;
}