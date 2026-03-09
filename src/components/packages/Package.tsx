"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { packageSchema } from "@/schema/package.schema";

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
import { Switch } from "@/components/ui/switch";

import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Save, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePackageStore } from "@/store/package.store";
import { useEffect, type Dispatch } from "react";
import { ImageUpload } from "../common/ImageUpload";
import type { UploadImageResponse } from "@/types/upload";
import { handleImageRemove, handleImageUpload } from "@/utils/image-upload";
import { categories, destinationType } from "@/const/constaint";

type FormValues = z.infer<typeof packageSchema>;

export default function PackageForm({
  isEditing = false,
  handleTabChange,
  setIsPackagedFormFilled,
}: {
  isEditing?: boolean;
  handleTabChange: (value: string) => void;
  setIsPackagedFormFilled: Dispatch<React.SetStateAction<boolean>>;
}) {
  const { formData, setFormData } = usePackageStore();
  const form = useForm<FormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: formData,
  });

  // Update Zustand whenever form changes
  useEffect(() => {
    const subscription = form.watch((values: any) => {
      setFormData(values);
    });
    return () => subscription.unsubscribe();
  }, [form, setFormData]);

  // Field Arrays
  const inclusions = useFieldArray<any>({
    control: form.control,
    name: "inclusions",
  });

  const exclusions = useFieldArray<any>({
    control: form.control,
    name: "exclusions",
  });

  const dates = useFieldArray<any>({
    control: form.control,
    name: "availableDates",
  });

  const onSubmit = () => {
    console.log("SUBMITTED DATA:", formData);
    handleTabChange("tab2");
    setIsPackagedFormFilled(true);
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {isEditing ? "Edit Tour Package" : "Create New Tour Package"}
              </h1>
              <p className="text-muted-foreground">
                Fill in the details to create a new tour package
              </p>
            </div>
            <Button
              onClick={() => onSubmit()}
              type="submit"
              size="lg"
              className="gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              Next
            </Button>
          </div>

          <Separator />

          {/* BASIC INFO CARD */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Romantic Paris Getaway"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="destinationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Paris, France" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., romantic-paris-getaway" {...field} />
                      </FormControl>
                      <FormDescription>URL-friendly version of the title</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value as UploadImageResponse | undefined}
                          multiple={false}
                          onChange={(image) => field.onChange(image)}
                          onUpload={handleImageUpload}
                          onRemove={handleImageRemove}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <FormField
                  control={form.control}
                  name="nights"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nights</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val === "" ? 0 : Number(val));
                          }}
                          onFocus={(e) => {
                            if (field.value === 0) field.onChange("" as any);
                            e.target.select();
                          }}
                          onBlur={() => {
                            if (!field.value) field.onChange(0);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="days"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Days</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val === "" ? 0 : Number(val));
                          }}
                          onFocus={(e) => {
                            if (field.value === 0) field.onChange("" as any);
                            e.target.select();
                          }}
                          onBlur={() => {
                            if (!field.value) field.onChange(0);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="groupSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Size</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Active</FormLabel>
                        <FormDescription>Package is available</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPublic"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Public</FormLabel>
                        <FormDescription>Visible on website</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* PRICING & CATEGORY CARD */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="pricePerPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Per Person ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val === "" ? 0 : Number(val));
                          }}
                          onFocus={(e) => {
                            if (field.value === 0) field.onChange("" as any);
                            e.target.select();
                          }}
                          onBlur={() => {
                            if (!field.value) field.onChange(0);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountPercent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val === "" ? 0 : Number(val));
                          }}
                          onFocus={(e) => {
                            if (field.value === 0) field.onChange("" as any);
                            e.target.select();
                          }}
                          onBlur={() => {
                            if (!field.value) field.onChange(0);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>

                      <div className="grid grid-cols-2 gap-3">
                        {categories.map((cat) => {
                          const checked = field.value?.includes(cat);

                          return (
                            <label
                              key={cat}
                              className="flex items-center gap-2 border rounded-md p-3 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    field.onChange([
                                      ...(field.value || []),
                                      cat,
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value.filter((c) => c !== cat),
                                    );
                                  }
                                }}
                              />
                              {cat}
                            </label>
                          );
                        })}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination Type</FormLabel>

                      <div className="grid grid-cols-2 gap-3">
                        {destinationType.map((dt) => {
                          const checked = field.value?.includes(dt);

                          return (
                            <label
                              key={dt}
                              className="flex items-center gap-2 border rounded-md p-3 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    field.onChange([
                                      ...(field.value || []),
                                      dt,
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value.filter((t) => t !== dt),
                                    );
                                  }
                                }}
                              />
                              {dt}
                            </label>
                          );
                        })}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* DATES CARD */}
          <Card>
            <CardHeader>
              <CardTitle>Available Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dates.fields.map((field, index) => (
                <div key={field.id} className="flex gap-3">
                  <FormField
                    control={form.control}
                    name={`availableDates.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => dates.remove(index)}
                    className="shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => dates.append("")}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Date
              </Button>
            </CardContent>
          </Card>

          {/* INCLUSIONS & EXCLUSIONS CARDS */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inclusions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {inclusions.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <FormField
                      control={form.control}
                      name={`inclusions.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="e.g., Hotel accommodation"
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
                      onClick={() => inclusions.remove(index)}
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => inclusions.append("")}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Inclusion
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exclusions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {exclusions.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <FormField
                      control={form.control}
                      name={`exclusions.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="e.g., Flight tickets"
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
                      onClick={() => exclusions.remove(index)}
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => exclusions.append("")}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Exclusion
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* DESCRIPTION CARD */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the package in detail..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* SEO CARD */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input placeholder="SEO optimized title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Leave empty to use the package title
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description for search engines"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Recommended length: 150-160 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* SUBMIT BUTTON (mobile) */}
          <div className="md:hidden flex justify-end">
            <Button type="submit" size="lg" className="gap-2 w-full">
              <Save className="h-4 w-4" />
              Save Package
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
