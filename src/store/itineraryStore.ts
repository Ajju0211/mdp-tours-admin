// stores/itineraryStore.ts
import { create } from "zustand";

import { z } from "zod";
import { dayPlanSchema } from "@/schema/package.schema";

export const itinerarySchema = z.object({
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

      days: [defaultDay],
    },
    setItineraryFormData: (data) =>
      set((state) => ({
        itineraryFormData: { ...state.itineraryFormData, ...data },
      })),
    resetItineraryForm: () =>
      set({
        itineraryFormData: {

          days: [defaultDay],
        },
      }),
  }),
  // { name: "itinerary-form-storage" }, // localStorage key
  // ),
);
