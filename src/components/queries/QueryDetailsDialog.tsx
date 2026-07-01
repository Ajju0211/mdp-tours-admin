"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type { QueryItem } from "@/types/query";

import { queryStatus } from "@/config/query";
import { updateQueryStatus, deleteQuery } from "@/api/query/query";
import type { QueryStatus } from "@/enum/query-enum";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: QueryItem | null;
  onStatusUpdate?: () => void;
}

export function QueryDetailsDialog({
  open,
  onOpenChange,
  query,
  onStatusUpdate,
}: Props) {
  const [status, setStatus] = React.useState(query?.status);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    if (query) {
      setStatus(query.status);
    }
  }, [query]);

  if (!query) return null;

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateQueryStatus(query._id, status as QueryStatus);
      toast.success("Status updated successfully");
      onStatusUpdate?.();
      onOpenChange(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this query?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await deleteQuery(query._id);
      toast.success("Query deleted successfully");
      onStatusUpdate?.();
      onOpenChange(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to delete query");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Query Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold">Full Name</p>
            <p>{query.fullName}</p>
          </div>

          <div>
            <p className="font-semibold">Email</p>
            <p>{query.email}</p>
          </div>

          <div>
            <p className="font-semibold">Phone</p>
            <p>{query.phone}</p>
          </div>

          <div>
            <p className="font-semibold">Service</p>
            <p>{query.service}</p>
          </div>

          {query.packageId && (
            <div>
              <p className="font-semibold">Linked Tour Package</p>
              <a
                href={`http://localhost:3000/packages/${query.packageId.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {query.packageId.title}
              </a>
            </div>
          )}

          <Separator />

          <div>
            <p className="font-semibold">Message</p>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {query.message}
            </p>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <Badge>{query.status}</Badge>

            <Select
              value={status}
              onValueChange={(val) => setStatus(val as any)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Change status" />
              </SelectTrigger>
              <SelectContent>
                {queryStatus.map((item) => (
                  <SelectItem value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 w-full pt-2">
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting || isUpdating}
              className="flex-1"
            >
              {isDeleting ? "Deleting..." : "Delete Query"}
            </Button>
            <Button
              onClick={handleStatusUpdate}
              disabled={isDeleting || isUpdating}
              className="flex-1"
            >
              {isUpdating ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
