import { deleteAdminImage, uploadAdminImages } from "@/api/upload/upload";
import type { UploadImageResponse } from "@/types/upload";
import { toast } from "sonner";

export const handleImageUpload = async (
    files: File | File[],
): Promise<UploadImageResponse | UploadImageResponse[]> => {
    try {
        const payload = Array.isArray(files) ? files : [files];

        const res: any = await uploadAdminImages(payload);

        const normalize = (item: any): UploadImageResponse => ({
            url: item.url,
            key: item.key,
            size: item.size,
        });

        if (Array.isArray(res)) {
            return res.map(normalize);
        }

        return normalize(res);
    } catch (err: any) {
        console.log("Error", err);
        toast.error(
            err?.response?.data?.message ??
            err?.message ??
            "Failed to upload image",
        );
        throw err;
    }
};
export const handleImageRemove = async (file: UploadImageResponse) => {
    try {
        await deleteAdminImage(file.key);
        toast.success("Image deleted successfully");
    } catch (err: any) {
        console.log("Error", err);
        toast.error(
            err?.response?.data?.message ??
            err?.message ??
            "Failed to delete image",
        );
        throw err;
    }
};