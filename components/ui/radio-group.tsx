"use client";

import { forwardRef } from "react";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils/classnames";

import { FormControl, FormItem, FormLabel } from "./form";

const RadioGroup = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    layout?: "horizontal" | "vertical";
  }
>(({ className, layout, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        layout === "horizontal" ? "flex flex-row space-x-4" : "grid gap-2",
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export type RadioGroupMapProps = React.ComponentProps<typeof RadioGroup> & {
  items: { value: string; label: string }[];
};

const RadioGroupMap = forwardRef<
  React.ElementRef<typeof RadioGroup>,
  RadioGroupMapProps
>(({ items, ...props }, ref) => {
  return (
    <RadioGroup {...props} ref={ref}>
      {items.map((item) => (
        <RadioGroupItem key={item.value} value={item.value} />
      ))}
    </RadioGroup>
  );
});
RadioGroupMap.displayName = "RadioGroupMap";

export { RadioGroup, RadioGroupItem, RadioGroupMap };
