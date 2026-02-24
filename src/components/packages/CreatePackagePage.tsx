"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import PackageForm from "./Package"
import ItineraryForm from "./ItineraryForm"


export default function SimpleTabs() {
  return (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="tab1">Package</TabsTrigger>
        <TabsTrigger value="tab2">Itinary</TabsTrigger>
      </TabsList>

      <TabsContent value="tab1" className="mt-6">
        <PackageForm />
      </TabsContent>

      <TabsContent value="tab2" className="mt-6">
        <ItineraryForm />
      </TabsContent>
    </Tabs>
  )
}
