// stores/packageStore.ts
import { create } from "zustand";
import { z } from "zod";
import { packageSchema } from "@/schema/package.schema";

type PackageFormValues = z.infer<typeof packageSchema>;

interface PackageStore {
  formData: PackageFormValues;
  setFormData: (data: Partial<PackageFormValues>) => void;
  resetForm: () => void;
}

export const usePackageStore = create<PackageStore>()(
  // persist(
  (set) => ({
    formData: {
      title: "",
      destinationName: "",
      coverImage: null,
      nights: 1,
      days: 1,
      pricePerPerson: 0,
      discountPercent: 0,
      category: ["Family"],
      type: [],
      minGroupSize: 1,
      maxGroupSize: 10,
      isActive: true,
      isPublic: false,
      inclusions: [],
      exclusions: [],
      availableDates: [],
      description: "",
      metaTitle: "",
      metaDescription: "",
    },
    setFormData: (data) =>
      set((state) => ({
        formData: { ...state.formData, ...data },
      })),
    resetForm: () =>
      set({
        formData: {
          title: "",
          destinationName: "",
          coverImage: null,
          nights: 1,
          days: 1,
          pricePerPerson: 0,
          discountPercent: 0,
          minGroupSize: 1,
          maxGroupSize: 10,
          type: [],
          category: ["Family"],
          isActive: true,
          isPublic: false,
          inclusions: [""],
          exclusions: [""],
          availableDates: [""],
          description: "",
          metaTitle: "",
          metaDescription: "",
        },
      }),
  }),
  //   {
  //     name: "package-form-storage", // localStorage key
  //   }
  // )
);
