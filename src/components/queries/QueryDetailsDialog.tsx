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

  React.useEffect(() => {
    setStatus(query?.status);
  }, [query]);

  if (!query) return null;

  const handleStatusUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/queries/${query._id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );

      if (!res.ok) throw new Error();

      toast.success("Status updated successfully");
      onStatusUpdate?.();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update status");
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

          <Button onClick={handleStatusUpdate} className="w-full">
            Update Status
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
