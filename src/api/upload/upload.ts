import type { UploadImageResponse } from "@/types/upload";
import { api } from "../axios";

export async function uploadAdminImages(
  files: File | File[],
): Promise<UploadImageResponse | UploadImageResponse[]> {
  try {
    const formData = new FormData();

    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    } else {
      formData.append("files", files);
    }

    const response = await api.post<
      UploadImageResponse | UploadImageResponse[]
    >("/admin/upload/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to upload image");
    } else {
      throw new Error(error.message || "Failed to upload image");
    }
  }
}

export async function deleteAdminImage(
  key: string,
): Promise<{ message: string; key: string }> {
  try {
    const response = await api.delete<{
      message: string;
      key: string;
    }>("/admin/upload/image", {
      data: { key },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to delete image");
    } else {
      throw new Error(error.message || "Failed to delete image");
    }
  }
}
