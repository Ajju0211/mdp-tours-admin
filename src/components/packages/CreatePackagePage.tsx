"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PackageForm from "./Package";
import ItineraryForm from "./ItineraryForm";
import { useItineraryStore } from "@/store/itineraryStore";
import { usePackageStore } from "@/store/package.store";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createPackageWithItinerary,
  getPackageById,
  updatePackageWithItinerary,
} from "@/api/packages/package";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export default function SimpleTabs() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const isEditMode = !!id;
  const { itineraryFormData, setItineraryFormData, resetItineraryForm } =
    useItineraryStore();
  const { setFormData, formData, resetForm } = usePackageStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [isPackagedFormFilled, setIsPackagedFormFilled] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const onSubmit = async () => {
    // Validate that we have the minimum required data
    if (!formData.title?.trim()) {
      toast.error("Package title is required");
      setActiveTab("tab1");
      return;
    }

    if (!itineraryFormData.days?.length) {
      toast.error("At least one itinerary day is required");
      return;
    }

    // Build the request payload, filtering out empty strings
    const reqData = {
      ...formData,
      inclusions: formData.inclusions?.filter((s) => s.trim()) ?? [],
      exclusions: formData.exclusions?.filter((s) => s.trim()) ?? [],
      availableDates: formData.availableDates?.filter((s) => s.trim()) ?? [],
      itineraryDays: itineraryFormData.days.map((day) => ({
        ...day,
        activities: day.activities?.filter((a) => a.trim()) ?? [],
        optionalActivities:
          day.optionalActivities?.filter((a) => a.trim()) ?? [],
      })),
    };

    setIsSubmitting(true);
    const toastId = toast.loading(
      isEditMode ? "Updating package…" : "Creating package…",
    );

    try {
      if (isEditMode && id) {
        await updatePackageWithItinerary(id, reqData);
        toast.success("Package updated successfully!", { id: toastId });
      } else {
        await createPackageWithItinerary(reqData);
        toast.success("Package created successfully!", { id: toastId });
      }

      // Reset both stores after successful submission
      resetForm();
      resetItineraryForm();

      // Navigate back to the packages list
      navigate("/all-package");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        (isEditMode ? "Failed to update package" : "Failed to create package");

      toast.error(message, { id: toastId });
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchPackage = async (id: string) => {
    setIsLoading(true);
    try {
      // Fetch package data by ID and set it to the form
      const response = await getPackageById(id);
      console.log("Fetched package data:", response);
      setFormData(response.package);
      setItineraryFormData(response.itinerary);
    } catch (error: any) {
      console.error("Error fetching package:", error);
      toast.error(
        error?.message || "Failed to fetch package data. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializePage = async () => {
      setIsReady(false);
      if (id) {
        // fetch existing data
        await fetchPackage(id);
      } else {
        // Clear form when in create mode (e.g. Navigating from edit -> create)
        resetForm();
        resetItineraryForm();
      }
      setIsReady(true);
    };

    initializePage();
  }, [id, resetForm, resetItineraryForm]);

  const handleTabChange = (value: string) => {
    if (value === "tab2") {
      const isValid = isPackagedFormFilled;
      if (!isValid) return;
    }

    setActiveTab(value);
  };

  useEffect(() => {}, [itineraryFormData, formData]);

  if (!isReady || (isLoading && isEditMode)) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="flex gap-2 items-center text-muted-foreground">
          <LoaderCircle className="animate-spin h-5 w-5" />
          <span>Preparing form...</span>
        </div>
      </div>
    );
  }

  return (
    <Tabs
      key={id || "new"}
      value={activeTab}
      onValueChange={handleTabChange}
      defaultValue="tab1"
      activationMode="manual"
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="tab1">Package</TabsTrigger>
        <TabsTrigger value="tab2">Itinary</TabsTrigger>
      </TabsList>

      <TabsContent value="tab1" className="mt-6">
        <PackageForm
          handleTabChange={handleTabChange}
          isEditing={isEditMode}
          setIsPackagedFormFilled={setIsPackagedFormFilled}
        />
      </TabsContent>

      <TabsContent value="tab2" className="mt-6">
        <ItineraryForm
          isEditing={isEditMode}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
    </Tabs>
  );
}
