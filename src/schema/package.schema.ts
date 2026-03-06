import { z } from "zod";

const ImageItemSchema = z.object({
  url: z.string().url("Image must have a valid URL"),
  alt: z.string().optional(),
  id: z.string().optional(),
});

export const packageSchema = z.object({
  title: z.string().min(3, "Title is required"),
  destinationName: z.string().min(2),
  slug: z.string().min(3),
  coverImage: ImageItemSchema,

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

  inclusions: z.array(z.string()),
  exclusions: z.array(z.string()),
  availableDates: z.array(z.string()),

  description: z.string().min(10),

  metaTitle: z.string().min(3),
  metaDescription: z.string().min(10),
});

export type PackageFormValues = z.infer<typeof packageSchema>;

export const dayPlanSchema = z.object({
  dayNumber: z.number().int().positive("Day number must be positive"),
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().optional(),
  activities: z.array(z.string()).min(1, "At least one activity is required"),
  images: z.array(ImageItemSchema).optional(),
  optionalActivities: z.array(z.string()).optional().default([]),
  meals: z
    .object({
      breakfast: z.string().optional().default(""),
      lunch: z.string().optional().default(""),
      dinner: z.string().optional().default(""),
    })
    .optional(),
  location: z
    .object({
      lat: z.number().optional(),
      lng: z.number().optional(),
    })
    .optional(),
  transport: z.string().optional(),
  notes: z.string().optional(),
});

export const itinerarySchema = z.object({
  // packageId: z.string().min(1, "Package ID is required"),
  days: z.array(dayPlanSchema).min(1, "At least one day is required"),
});

export type DayPlanFormValues = z.infer<typeof dayPlanSchema>;
export type ItineraryFormValues = z.infer<typeof itinerarySchema>;
