// stores/itineraryStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
import { dayPlanSchema } from "@/schema/package.schema";

export const itinerarySchema = z.object({
  packageId: z.string().optional(),
  days: z.array(dayPlanSchema).min(1),
});

export type ItineraryFormValues = z.infer<typeof itinerarySchema>;

const defaultDay = {
  dayNumber: 1,
  title: "",
  description: "",
  activities: [""],
  images: [],
  optionalActivities: [],
  meals: { breakfast: "", lunch: "", dinner: "" },
  location: { lat: undefined, lng: undefined },
  transport: "",
  videos: [],
  notes: "",
};

export const useItineraryStore = create<{
  itineraryFormData: ItineraryFormValues;
  setItineraryFormData: (data: Partial<ItineraryFormValues>) => void;
  resetItineraryForm: () => void;
}>()(
  // persist(
  (set) => ({
    itineraryFormData: {
      packageId: "",
      days: [defaultDay],
    },
    setItineraryFormData: (data) =>
      set((state) => ({
        itineraryFormData: { ...state.itineraryFormData, ...data },
      })),
    resetItineraryForm: () =>
      set({
        itineraryFormData: {
          packageId: "",
          days: [defaultDay],
        },
      }),
  }),
  // { name: "itinerary-form-storage" }, // localStorage key
  // ),
);
