import type { GetPackagesResponse } from "@/types/packages";
import { api } from "../axios";

export async function getAllPackages(
  page: number = 1,
  limit: number = 10,
  category?: string,
  isActive?: boolean,
  isPublic?: boolean,
): Promise<GetPackagesResponse> {
  try {
    const response = await api.get<GetPackagesResponse>("/packages/admin", {
      params: {
        page,
        limit,
        category,
        isActive,
        isPublic,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to fetch packages",
      );
    } else {
      throw new Error(error.message || "Failed to fetch packages");
    }
  }
}

export async function createPackageWithItinerary(data: any) {
  try {
    const response = await api.post("/packages/create-with-itinerary", data);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to create package",
      );
    } else {
      throw new Error(error.message || "Failed to create package");
    }
  }
}

export async function updatePackageWithItinerary(id: string, data: any) {
  try {
    const response = await api.patch(
      `/packages/${id}/update-with-itinerary`,
      data,
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to update package",
      );
    } else {
      throw new Error(error.message || "Failed to update package");
    }
  }
}

export async function getPackageBySlug(slug: string): Promise<any> {
  try {
    const response = await api.get<any>(`/packages/${slug}`);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch package");
    } else {
      throw new Error(error.message || "Failed to fetch package");
    }
  }
}

export async function getPackageById(id: string): Promise<any> {
  try {
    const response = await api.get<any>(`/packages/id/${id}`);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch package");
    } else {
      throw new Error(error.message || "Failed to fetch package");
    }
  }
}

export async function deletePackage(id: string): Promise<any> {
  try {
    const response = await api.delete<any>(`/packages/${id}`);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to delete package",
      );
    } else {
      throw new Error(error.message || "Failed to delete package");
    }
  }
}
