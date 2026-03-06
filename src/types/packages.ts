export interface PackageItem {
  _id: string;
  title: string;
  destinationName: string;
  category: string;
  pricePerPerson: number;
  nights: number;
  days: number;
  isActive: boolean;
  createdAt: string;
}

export interface GetPackagesResponse {
  data: PackageItem[];
  total: number;
}

export interface ImageItemType {
  key: string;
  url: string;
  size: number;
}

// ================= DAY PLAN =================

export interface DayPlan {
  dayNumber: number;
  title: string;
  description?: string;

  activities: string[];
  images?: ImageItemType[];
  optionalActivities?: string[];

  transport?: string;
  videos?: string[];
  notes?: string;

  meals?: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };

  location?: {
    lat?: number;
    lng?: number;
  };
}

// ================= CREATE PACKAGE WITH ITINERARY =================

export interface CreatePackageWithItineraryDto {
  id: string;
  title: string;
  destinationName: string;

  nights: number;
  pricePerPerson: number;

  coverImage: ImageItemType;

  isActive: boolean;
  isPublic: boolean;

  inclusions: string[];
  exclusions: string[];
  availableDates: string[]; // ISO string dates

  description: string;
  metaTitle: string;
  metaDescription: string;

  days: DayPlan[];
}
