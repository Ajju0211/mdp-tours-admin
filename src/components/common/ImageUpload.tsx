"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Camera } from "lucide-react";
import type { UploadImageResponse } from "@/types/upload";

interface ImageUploadProps {
  value?: UploadImageResponse | UploadImageResponse[];
  onChange: (value: any) => void;
  multiple?: boolean;
  maxFiles?: number;
  onRemove: () => void;
  onUpload?: (file: File) => Promise<UploadImageResponse>; // cloud upload function
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  multiple = false,
  maxFiles,
  onUpload,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;

    const uploadedFiles: UploadImageResponse[] = [];

    for (const file of Array.from(files)) {
      if (onUpload) {
        const uploaded = await onUpload(file);
        uploadedFiles.push(uploaded);
      }
    }

    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      onChange([...current, ...uploadedFiles]);
    } else {
      onChange(uploadedFiles[0]);
    }
  };

  const handleRemove = (index?: number) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      const newValue = current.filter((_, i) => i !== index);
      onChange(newValue);
    } else {
      onChange(undefined as any);
    }
  };

  const currentFiles = multiple
    ? Array.isArray(value)
      ? value
      : []
    : value
      ? [value]
      : [];

  return (
    <div className="flex flex-col gap-2">
      {/* Upload Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2"
      >
        <Camera className="w-4 h-4" />
        {multiple
          ? "Upload Images"
          : currentFiles.length
            ? "Replace Image"
            : "Upload Image"}
      </Button>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Images Grid */}
      {currentFiles.length > 0 && (
        <div
          className={`grid ${multiple ? "grid-cols-4" : "grid-cols-1"} gap-4 mt-2`}
        >
          {(currentFiles as UploadImageResponse[]).map((img, idx) => (
            <div
              key={img.key || idx}
              className="relative w-full h-32 border rounded-md overflow-hidden group"
            >
              <img
                src={img.url}
                alt={`Image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition"
                onClick={() => handleRemove(idx)}
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
