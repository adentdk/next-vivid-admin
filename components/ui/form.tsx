"use client";

import {
  cloneElement,
  createContext,
  forwardRef,
  useContext,
  useId,
} from "react";

import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/classnames";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "control">) => {
  const { control } = useFormContext<TFieldValues, TName>();
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller control={control} {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

const FormAddons = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex min-h-max min-w-max flex-col justify-center border border-md border-input bg-background px-3 text-sm text-foreground",
        className,
      )}
      {...props}
    ></div>
  );
});
FormAddons.displayName = "FormAddons";

const FormItemWrapper = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactElement;
    horizontal?: boolean;
    label?: React.ReactNode;
    mandatory?: boolean;
    optional?: boolean;
    description?: React.ReactNode;
    append?: React.ReactNode;
    prepend?: React.ReactNode;
  }
>(
  (
    {
      append,
      prepend,
      className,
      children,
      label,
      mandatory,
      optional,
      description,
      horizontal,
      ...props
    },
    ref,
  ) => {
    return (
      <FormItem className={className} ref={ref} {...props}>
        {typeof label !== "undefined" ? (
          <FormLabel mandatory={mandatory} optional={optional}>
            {label}
          </FormLabel>
        ) : null}

        <div className={cn("flex flex-1", horizontal ? "justify-end" : "")}>
          {typeof prepend !== "undefined" ? (
            <FormAddons className={cn("border-e-0")}>{prepend}</FormAddons>
          ) : null}
          {cloneElement(children, {
            className: cn(children.props.className || "", {
              "rounded-s-none": typeof prepend !== "undefined",
              "rounded-e-none": typeof append !== "undefined",
            }),
          })}
          {typeof append !== "undefined" ? (
            <FormAddons className={cn("border-s-0")}>{append}</FormAddons>
          ) : null}
        </div>

        {typeof description !== "undefined" ? (
          <FormDescription>{description}</FormDescription>
        ) : null}

        <FormMessage />
      </FormItem>
    );
  },
);
FormItemWrapper.displayName = "FormItemWrapper";

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormItemWrapper,
  FormLabel,
  FormMessage,
  useFormField,
};
