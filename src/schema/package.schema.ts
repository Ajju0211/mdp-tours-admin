import { z } from "zod"

export const packageSchema = z.object({
  title: z.string().min(3, "Title is required"),
  destinationName: z.string().min(2),
  slug: z.string().min(3),
  coverImage: z.string().url("Cover image must be valid URL"),

  nights: z.number().min(1),
  days: z.number().min(1),

  pricePerPerson: z.number().min(0),
  discountPercent: z.number().min(0).max(100),

  category: z.enum([
    "Family",
    "Couple",
    "Adventure",
    "Luxury",
    "Women-only",
    "Solo",
  ]),

  isActive: z.boolean(),
  isPublic: z.boolean(),

  inclusions: z.array(z.string().min(1)),
  exclusions: z.array(z.string().min(1)),
  availableDates: z.array(z.string()),

  description: z.string().min(10),

  metaTitle: z.string().min(3),
  metaDescription: z.string().min(10),
})

export type PackageFormValues = z.infer<typeof packageSchema>


export const dayPlanSchema = z.object({
  dayNumber: z.number().int().positive("Day number must be positive"),
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().optional(),
  activities: z.array(z.string()).min(1, "At least one activity is required"),
  images: z.array(z.string().url("Invalid image URL")).optional().default([]),
  optionalActivities: z.array(z.string()).optional().default([]),
  meals: z.object({
    breakfast: z.string().optional().default(""),
    lunch: z.string().optional().default(""),
    dinner: z.string().optional().default(""),
  }).optional(),
  location: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
  }).optional(),
  transport: z.string().optional(),
  videos: z.array(z.string().url("Invalid video URL")).optional().default([]),
  notes: z.string().optional(),
});

export const itinerarySchema = z.object({
  packageId: z.string().min(1, "Package ID is required"),
  days: z.array(dayPlanSchema).min(1, "At least one day is required"),
});

export type DayPlanFormValues = z.infer<typeof dayPlanSchema>;
export type ItineraryFormValues = z.infer<typeof itinerarySchema>;