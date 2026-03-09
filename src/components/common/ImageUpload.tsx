"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Camera, Loader2 } from "lucide-react";
import type { UploadImageResponse } from "@/types/upload";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: UploadImageResponse | UploadImageResponse[];
  onChange: (
    value: UploadImageResponse | UploadImageResponse[] | undefined,
  ) => void;

  multiple?: boolean;
  maxFiles?: number;
  accept?: string;

  onUpload: (
    files: File | File[],
  ) => Promise<UploadImageResponse | UploadImageResponse[]>;

  onRemove?: (file: UploadImageResponse) => Promise<void> | void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  multiple = false,
  maxFiles = 10,
  accept = "image/*",
  onUpload,
  onRemove,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [deletingIndex, setDeletingIndex] = React.useState<number | null>(null);

  const files = React.useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList?.length) return;

    let selectedFiles = Array.from(fileList);

    // restrict single upload
    if (!multiple) {
      selectedFiles = [selectedFiles[0]];
    }

    // enforce maxFiles limit
    if (multiple && files.length + selectedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setLoading(true);

    try {
      const payload = multiple ? selectedFiles : selectedFiles[0];
      const uploaded = await onUpload(payload);

      if (multiple) {
        const uploadedArray = Array.isArray(uploaded) ? uploaded : [uploaded];
        const newValue = [...files, ...uploadedArray];
        onChange(newValue);
      } else {
        const uploadedFile = Array.isArray(uploaded) ? uploaded[0] : uploaded;
        onChange(uploadedFile);
      }
    } catch {
      // Error is already handled by the onUpload function (toast shown there)
    } finally {
      setLoading(false);
      // Reset file input so the same file can be re-selected
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleRemove = async (index: number) => {
    const file = files[index];
    setDeletingIndex(index);

    try {
      if (onRemove) await onRemove(file);

      // Only update UI if the backend delete succeeded
      if (multiple) {
        const updated = files.filter((_, i) => i !== index);
        onChange(updated.length ? updated : undefined);
      } else {
        onChange(undefined);
      }
    } catch {
      // onRemove threw — keep the image in place, error toast already shown
    } finally {
      setDeletingIndex(null);
    }
  };

  const disableUpload =
    loading ||
    deletingIndex !== null ||
    (!multiple && files.length >= 1) ||
    (multiple && files.length >= maxFiles);

  return (
    <div className="flex flex-col gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        disabled={disableUpload}
        className="flex items-center gap-2"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Camera className="h-4 w-4" />
        )}

        {loading
          ? "Uploading…"
          : multiple
            ? `Upload Images (${files.length}/${maxFiles})`
            : files.length
              ? "Replace Image"
              : "Upload Image"}
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {files.length > 0 && (
        <div
          className={`grid gap-4 ${
            multiple
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {files.map((img, idx) => (
            <div
              key={img.key || idx}
              className="relative aspect-video border rounded-md overflow-hidden group"
            >
              <img
                src={img.url}
                alt={(img as any).alt ?? "Uploaded image"}
                className="w-full h-full object-cover"
              />

              {/* Deleting overlay */}
              {deletingIndex === idx && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
              )}

              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition"
                onClick={() => handleRemove(idx)}
                disabled={deletingIndex !== null}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
