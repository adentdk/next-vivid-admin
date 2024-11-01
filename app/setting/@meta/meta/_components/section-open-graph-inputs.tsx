'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';

export default function SectionOpenGraphInputs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Open Graph Config</CardTitle>
        <CardDescription>~</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FormField
          name="openGraph.title"
          render={({ field }) => (
            <FormItem>
              <FormLabel mandatory>Og Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Og title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="openGraph.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Og Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Og description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="openGraph.url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Og URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter Og URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="openGraph.siteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Og Site Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Og site name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
