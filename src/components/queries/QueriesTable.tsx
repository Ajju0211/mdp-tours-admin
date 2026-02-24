"use client";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useQueriesTable, { columns } from "./useQueriesTable";
import  type{ Query } from "@/types/query";

interface Props {
  queries: Query[];
}

export default function QueriesTable({ queries }: Props) {
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filters = { search, service: serviceFilter, status: statusFilter, fromDate, toDate };
  const table = useQueriesTable(queries, filters);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Search by name, email, phone, message..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-2 border rounded flex-1 min-w-[200px]"
        />
        <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)} className="p-2 border rounded">
          <option value="All">All Services</option>
          <option value="Web Development">Web Development</option>
          <option value="App Development">App Development</option>
          <option value="SEO">SEO</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Web Design">Web Design</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="p-2 border rounded">
          <option value="All">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="resolved">Resolved</option>
        </select>
        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="p-2 border rounded" />
        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="p-2 border rounded" />
      </div>

      {/* Table */}
      <Table className="overflow-x-auto">
        <TableHeader>
          <TableRow>
            {columns.map(col => (
              <TableHead key={col.id}>{col.header as string}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{cell.getValue() as React.ReactNode}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-2">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="p-2 border rounded">
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="p-2 border rounded">
          Next
        </button>
      </div>
    </div>
  );
}