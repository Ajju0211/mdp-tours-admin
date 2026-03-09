"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Trash2,
  Save,
  MapPin,
  Camera,
  Video,
  Coffee,
  UtensilsCrossed,
  Moon,
  Activity,
  Navigation,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { itinerarySchema } from "@/schema/package.schema";
import { useItineraryStore } from "@/store/itineraryStore";
import { useEffect } from "react";
import { usePackageStore } from "@/store/package.store";
import { ImageUpload } from "../common/ImageUpload";
import { handleImageRemove, handleImageUpload } from "@/utils/image-upload";

type FormValues = z.infer<typeof itinerarySchema>;

interface ItineraryFormProps {
  packageId?: string;
  initialData?: Partial<FormValues>;
  onSubmit?: () => void;
  isEditing: boolean;
  isSubmitting?: boolean;
}

export default function ItineraryForm({
  packageId,
  initialData,
  onSubmit: externalOnSubmit,
  isEditing,
  isSubmitting = false,
}: ItineraryFormProps) {
  const { itineraryFormData, setItineraryFormData, resetItineraryForm } =
    useItineraryStore();
  const form = useForm<FormValues>({
    resolver: zodResolver(itinerarySchema) as any,
    defaultValues: itineraryFormData,
  });

  // Sync form with Zustand whenever it changes
  useEffect(() => {
    const subscription = form.watch((values) => {
      setItineraryFormData(values as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [form, setItineraryFormData]);

  // Field Arrays for days
  const days = useFieldArray({
    control: form.control,
    name: "days",
  });

  const onSubmit = () => {
    if (externalOnSubmit) {
      externalOnSubmit();
    }
  };

  const addNewDay = () => {
    const currentDays = form.getValues("days");
    const nextDayNumber = currentDays.length + 1;

    days.append({
      dayNumber: nextDayNumber,
      title: "",
      description: "",
      activities: [""],
      images: [],
      optionalActivities: [],
      meals: {
        breakfast: "",
        lunch: "",
        dinner: "",
      },
      location: {
        lat: undefined,
        lng: undefined,
      },
      transport: "",

      notes: "",
    });
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {isEditing ? "Edit Itinerary" : "Create Itinerary"}
              </h1>
              <p className="text-muted-foreground">
                Create a detailed day-by-day itinerary for your package
              </p>
            </div>
            <Button
              onClick={() => {
                onSubmit();
              }}
              type="submit"
              size="lg"
              className="gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSubmitting ? "Saving…" : "Save Itinerary"}
            </Button>
          </div>

          <Separator />

          {/* PACKAGE ID (hidden if provided) */}
          {/* {!packageId && (
            <Card>
              <CardHeader>
                <CardTitle>Package Association</CardTitle>
                <CardDescription>
                  Link this itinerary to a package
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="packageId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter package ID" {...field} />
                      </FormControl>
                      <FormDescription>
                        The unique identifier of the package this itinerary
                        belongs to
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )} */}

          {/* DAYS ITINERARY */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">
                Daily Schedule
              </h2>
              <Badge variant="outline" className="text-sm">
                {days.fields.length} {days.fields.length === 1 ? "Day" : "Days"}
              </Badge>
            </div>

            <Accordion type="multiple" className="space-y-4">
              {days.fields.map((dayField, dayIndex) => (
                <AccordionItem
                  key={dayField.id}
                  value={`day-${dayIndex}`}
                  className="border rounded-lg overflow-hidden bg-card"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold">
                        {dayIndex + 1}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold">
                          Day {dayIndex + 1}:{" "}
                          {form.watch(`days.${dayIndex}.title`) ||
                            "Untitled Day"}
                        </h3>
                        {form.watch(`days.${dayIndex}.location.lat`) && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            Location set
                          </p>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-6 pb-6 pt-2">
                    <div className="space-y-6">
                      {/* Day Header Actions */}
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => days.remove(dayIndex)}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove Day
                        </Button>
                      </div>

                      {/* Basic Day Info */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name={`days.${dayIndex}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Day Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Arrival & City Tour"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`days.${dayIndex}.transport`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Transport</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Private AC Vehicle"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Description */}
                      <FormField
                        control={form.control}
                        name={`days.${dayIndex}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Day Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe the day's highlights and activities..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Tabs for different sections */}
                      <Tabs defaultValue="activities" className="w-full">
                        <TabsList className="grid w-full grid-cols-5">
                          <TabsTrigger value="activities" className="gap-2">
                            <Activity className="h-4 w-4" />
                            <span className="hidden sm:inline">Activities</span>
                          </TabsTrigger>
                          <TabsTrigger value="meals" className="gap-2">
                            <UtensilsCrossed className="h-4 w-4" />
                            <span className="hidden sm:inline">Meals</span>
                          </TabsTrigger>
                          <TabsTrigger value="location" className="gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="hidden sm:inline">Location</span>
                          </TabsTrigger>
                          <TabsTrigger value="media" className="gap-2">
                            <Camera className="h-4 w-4" />
                            <span className="hidden sm:inline">Media</span>
                          </TabsTrigger>
                          <TabsTrigger value="notes" className="gap-2">
                            <span className="hidden sm:inline">Notes</span>
                          </TabsTrigger>
                        </TabsList>

                        {/* Activities Tab */}
                        <TabsContent
                          value="activities"
                          className="space-y-6 pt-4"
                        >
                          {/* Main Activities */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <FormLabel className="text-base">
                                Main Activities
                              </FormLabel>
                              <Badge variant="secondary">Required</Badge>
                            </div>

                            {form
                              .watch(`days.${dayIndex}.activities`)
                              ?.map((_, actIndex) => (
                                <div key={actIndex} className="flex gap-3">
                                  <FormField
                                    control={form.control}
                                    name={`days.${dayIndex}.activities.${actIndex}`}
                                    render={({ field }) => (
                                      <FormItem className="flex-1">
                                        <FormControl>
                                          <Input
                                            placeholder={`Activity ${actIndex + 1}`}
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {actIndex > 0 && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      onClick={() => {
                                        const currentActivities =
                                          form.getValues(
                                            `days.${dayIndex}.activities`,
                                          );
                                        const newActivities =
                                          currentActivities.filter(
                                            (_, i) => i !== actIndex,
                                          );
                                        form.setValue(
                                          `days.${dayIndex}.activities`,
                                          newActivities,
                                        );
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              ))}

                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const currentActivities =
                                  form.getValues(
                                    `days.${dayIndex}.activities`,
                                  ) || [];
                                form.setValue(`days.${dayIndex}.activities`, [
                                  ...currentActivities,
                                  "",
                                ]);
                              }}
                              className="gap-2"
                            >
                              <Plus className="h-4 w-4" />
                              Add Activity
                            </Button>
                          </div>

                          {/* Optional Activities */}
                          <div className="space-y-4">
                            <FormLabel className="text-base">
                              Optional Activities
                            </FormLabel>

                            {form
                              .watch(`days.${dayIndex}.optionalActivities`)
                              ?.map((_, optIndex) => (
                                <div key={optIndex} className="flex gap-3">
                                  <FormField
                                    control={form.control}
                                    name={`days.${dayIndex}.optionalActivities.${optIndex}`}
                                    render={({ field }) => (
                                      <FormItem className="flex-1">
                                        <FormControl>
                                          <Input
                                            placeholder={`Optional Activity ${optIndex + 1}`}
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                      const currentOptional =
                                        form.getValues(
                                          `days.${dayIndex}.optionalActivities`,
                                        ) || [];
                                      const newOptional =
                                        currentOptional.filter(
                                          (_, i) => i !== optIndex,
                                        );
                                      form.setValue(
                                        `days.${dayIndex}.optionalActivities`,
                                        newOptional,
                                      );
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}

                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const currentOptional =
                                  form.getValues(
                                    `days.${dayIndex}.optionalActivities`,
                                  ) || [];
                                form.setValue(
                                  `days.${dayIndex}.optionalActivities`,
                                  [...currentOptional, ""],
                                );
                              }}
                              className="gap-2"
                            >
                              <Plus className="h-4 w-4" />
                              Add Optional Activity
                            </Button>
                          </div>
                        </TabsContent>

                        {/* Meals Tab */}
                        <TabsContent value="meals" className="space-y-4 pt-4">
                          <div className="grid md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name={`days.${dayIndex}.meals.breakfast`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Coffee className="h-4 w-4" />
                                    Breakfast
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g., Hotel Buffet"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`days.${dayIndex}.meals.lunch`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <UtensilsCrossed className="h-4 w-4" />
                                    Lunch
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g., Local Restaurant"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`days.${dayIndex}.meals.dinner`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Moon className="h-4 w-4" />
                                    Dinner
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g., Fine Dining"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </TabsContent>

                        {/* Location Tab */}
                        <TabsContent
                          value="location"
                          className="space-y-4 pt-4"
                        >
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`days.${dayIndex}.location.lat`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Latitude</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="any"
                                      placeholder="e.g., 48.8566"
                                      value={field.value ?? ""}
                                      onChange={(e) => {
                                        const val = e.target.value;

                                        if (val === "") {
                                          field.onChange(undefined);
                                        } else {
                                          field.onChange(parseFloat(val));
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`days.${dayIndex}.location.lng`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Longitude</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="any"
                                      placeholder="e.g., 48.8566"
                                      value={field.value ?? ""}
                                      onChange={(e) => {
                                        const val = e.target.value;

                                        if (val === "") {
                                          field.onChange(undefined);
                                        } else {
                                          field.onChange(parseFloat(val));
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormDescription>
                            Enter the coordinates for the main location of the
                            day
                          </FormDescription>
                        </TabsContent>

                        {/* Media Tab */}
                        <TabsContent value="media" className="space-y-6 pt-4">
                          <FormField
                            control={form.control}
                            name={`days.${dayIndex}.images`}
                            render={({ field }: { field: any }) => (
                              <FormItem>
                                <FormLabel className="text-base flex items-center gap-2">
                                  <Camera className="h-4 w-4" />
                                  Images
                                </FormLabel>
                                <FormControl>
                                  <ImageUpload
                                    value={field.value ?? []}
                                    multiple
                                    maxFiles={6}
                                    onChange={(images) => {
                                      const normalized = images
                                        ? Array.isArray(images)
                                          ? images
                                          : [images]
                                        : [];
                                      field.onChange(normalized);
                                    }}
                                    onUpload={handleImageUpload}
                                    onRemove={handleImageRemove}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TabsContent>

                        {/* Notes Tab */}
                        <TabsContent value="notes" className="pt-4">
                          <FormField
                            control={form.control}
                            name={`days.${dayIndex}.notes`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Notes</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Any special instructions or notes for this day..."
                                    className="min-h-[150px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Add Day Button */}
            <Button
              type="button"
              onClick={addNewDay}
              className="w-full gap-2"
              variant="outline"
              size="lg"
            >
              <Plus className="h-4 w-4" />
              Add New Day
            </Button>
          </div>

          {/* Form Actions */}
          {/* <div className="flex justify-end gap-4 pt-6">
            <Button type="button" variant="outline" size="lg">
              Preview
            </Button>
            <Button type="submit" size="lg" className="gap-2">
              <Save className="h-4 w-4" />
              Save Itinerary
            </Button>
          </div> */}
        </form>
      </Form>
    </div>
  );
}
