"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextArrayInput } from "@/components/ui/text-array-input";
import { Textarea } from "@/components/ui/textarea";

export default function SectionBasicInputs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Meta Config</CardTitle>
        <CardDescription>~</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FormField
          name="title.default"
          render={({ field }) => (
            <FormItem>
              <FormLabel mandatory>Default Site Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter default site title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="title.template"
          render={({ field }) => (
            <FormItem>
              <FormLabel mandatory>Template Site Title</FormLabel>
              <FormControl prefix="%">
                <Input placeholder="Enter template site title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <FormControl>
                <TextArrayInput placeholder="Enter keywords" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="applicationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter application name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="generator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Generator</FormLabel>
              <FormControl>
                <Input placeholder="Enter template site title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="referrer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referrer</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter referrer when cross origin"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="creator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creator</FormLabel>
              <FormControl>
                <Input placeholder="Enter creator" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="publisher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publisher</FormLabel>
              <FormControl>
                <Input placeholder="Enter publisher" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
