"use client";

import * as React from "react";
import type {
  ColumnDef,
  SortingState,
  PaginationState,
  ColumnFiltersState,
} from "@tanstack/react-table";

import { DataTable } from "@/common/data-table";
import { deletePackage, getAllPackages } from "@/api/packages/package";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type PackageItem = any;

export default function PackagesListPage() {
  const [data, setData] = React.useState<PackageItem[]>([]);
  const [totalRows, setTotalRows] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [_sorting, _setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [activeFilter, setActiveFilter] = React.useState<boolean | undefined>(
    undefined,
  );

  const [publicFilter, setPublicFilter] = React.useState<boolean | undefined>(
    undefined,
  );

  const [selectedPackage, setSelectedPackage] =
    React.useState<PackageItem | null>(null);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleRowClick = (row: PackageItem) => {
    console.log("Row clicked:", row);
    setSelectedPackage(row);
    setOpenDialog(true);
    // navigate(`/add-package/${row._id}`);
  };

  async function fetchData() {
    try {
      setLoading(true);

      const categoryFilter = columnFilters.find((f) => f.id === "category")
        ?.value as string | undefined;

      const response = await getAllPackages(
        pagination.pageIndex + 1,
        pagination.pageSize,
        categoryFilter,
        activeFilter,
        publicFilter,
      );

      setData(response.data);
      setTotalRows(response.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePackage(id: string) {
    const toastId = toast.loading("Deleting package…");
    try {
      await deletePackage(id);
      // Immediately remove from UI without re-fetching
      setData((prev) => prev.filter((pkg) => pkg._id !== id));
      setTotalRows((prev) => prev - 1);
      setSelectedPackage(null);
      toast.success("Package deleted successfully!", { id: toastId });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Failed to delete package";
      toast.error(message, { id: toastId });
      console.error("Delete error:", error);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [pagination, columnFilters, activeFilter, publicFilter]);

  const columns: ColumnDef<PackageItem>[] = [
    {
      accessorKey: "title",
      header: "Package Title",
    },
    {
      accessorKey: "destinationName",
      header: "Destination",
    },
    {
      accessorKey: "category",
      header: "Category",
      enableColumnFilter: true,
    },
    {
      accessorKey: "pricePerPerson",
      header: "Price Per Person",
      cell: ({ row }) => `₹${row.original.pricePerPerson}`,
    },
    {
      accessorKey: "nights",
      header: "Nights",
    },
    {
      accessorKey: "days",
      header: "Days",
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => (row.original.isActive ? "Yes" : "No"),
    },
    {
      accessorKey: "isPublic",
      header: "Published",
      cell: ({ row }) => (row.original.isPublic ? "Yes" : "No"),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    // {
    //   id: "actions",
    //   header: "Actions",
    //   enableSorting: false,
    //   cell: ({ row }) => (
    //     <ConfirmDialog
    //       title="Delete Package?"
    //       description="This will permanently delete this package and its itinerary."
    //       onConfirm={async () => {
    //         await deletePackage(row.original._id);
    //         // refetchPackages();
    //       }}
    //       trigger={
    //         <Button
    //           variant="secondary"
    //           size="sm"
    //           onClick={(e) => e.stopPropagation()}
    //         >
    //           Delete
    //         </Button>
    //       }
    //     />
    //   ),
    // },
  ];

  return (
    <div className="p-6">
      <DataTable
        isLoading={loading}
        columns={columns}
        manualSorting
        data={data}
        manualPagination
        manualFiltering
        totalRows={totalRows}
        pageCount={Math.ceil(totalRows / pagination.pageSize)}
        pagination={pagination}
        onPaginationChange={setPagination}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        onRowClick={handleRowClick}
        renderTopToolbar={
          <div className="flex gap-2">
            {/* Active Filter */}
            <button
              className={`px-3 py-1 border rounded ${
                activeFilter === true ? "bg-black text-white" : ""
              }`}
              onClick={() => setActiveFilter(true)}
            >
              Active
            </button>

            <button
              className={`px-3 py-1 border rounded ${
                activeFilter === false ? "bg-black text-white" : ""
              }`}
              onClick={() => setActiveFilter(false)}
            >
              Inactive
            </button>

            {/* Publish Filter */}
            <button
              className={`px-3 py-1 border rounded ${
                publicFilter === true ? "bg-black text-white" : ""
              }`}
              onClick={() => setPublicFilter(true)}
            >
              Published
            </button>

            <button
              className={`px-3 py-1 border rounded ${
                publicFilter === false ? "bg-black text-white" : ""
              }`}
              onClick={() => setPublicFilter(false)}
            >
              Unpublished
            </button>

            {/* Reset */}
            <button
              className={`px-3 py-1 border rounded ${
                activeFilter === undefined && publicFilter === undefined
                  ? "bg-black text-white"
                  : ""
              }`}
              onClick={() => {
                setActiveFilter(undefined);
                setPublicFilter(undefined);
              }}
            >
              All
            </button>
          </div>
        }
        // actions={[
        //   {
        //     label: "Delete",
        //     onClick: (rows) => {
        //       rows.forEach((row) => deletePackage(row._id));
        //     },
        //   },
        // ]}
      />

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Package Actions</DialogTitle>
            <DialogDescription>
              Choose what you want to do with this package.
            </DialogDescription>
          </DialogHeader>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 py-4">
            <Button
              className="w-full"
              onClick={() => {
                if (selectedPackage) {
                  navigate(`/add-package/${selectedPackage._id}`);
                }
              }}
            >
              View Package
            </Button>

            <ConfirmDialog
              title="Delete Package?"
              description="This will permanently delete this package and its itinerary."
              onConfirm={async () => {
                if (selectedPackage) {
                  await handleDeletePackage(selectedPackage._id);
                  setOpenDialog(false);
                }
              }}
              trigger={
                <Button variant="destructive" className="w-full">
                  Delete Package
                </Button>
              }
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
