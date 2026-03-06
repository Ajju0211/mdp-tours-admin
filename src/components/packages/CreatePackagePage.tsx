"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PackageForm from "./Package";
import ItineraryForm from "./ItineraryForm";
import { useItineraryStore } from "@/store/itineraryStore";
import { usePackageStore } from "@/store/package.store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPackageById } from "@/api/packages/package";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export default function SimpleTabs() {
  const { id } = useParams<{ id?: string }>();

  const isEditMode = !!id;
  const { itineraryFormData, setItineraryFormData } = useItineraryStore();
  const { setFormData, formData } = usePackageStore();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (itinaryData: any, packageData: any) => {
    // Handle form submission logic here
    console.log("Form submitted");
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
    if (isEditMode) {
      // fetch existing data
      fetchPackage(id!);
    }
  }, [id]);

  useEffect(() => {}, [itineraryFormData, formData]);

  return isLoading && isEditMode ? (
    <div className="w-full h-full">
      <div className="mx-auto my-auto flex gap-1 items-center justify-center">
        <span>Loading...</span>
        <LoaderCircle className="animate-spin" />
      </div>
    </div>
  ) : (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="tab1">Package</TabsTrigger>
        <TabsTrigger value="tab2">Itinary</TabsTrigger>
      </TabsList>

      <TabsContent value="tab1" className="mt-6">
        <PackageForm isEditing={isEditMode} />
      </TabsContent>

      <TabsContent value="tab2" className="mt-6">
        <ItineraryForm isEditing={isEditMode} />
      </TabsContent>
    </Tabs>
  );
}
