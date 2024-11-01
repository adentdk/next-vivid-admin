"use client";

import { useFormStatus } from "react-dom";

import { Button, ButtonProps } from "../ui/button";

export default function SubmitButton({
  disabled,
  ...props
}: Omit<ButtonProps, "type">) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      disabled={disabled || pending}
      aria-disabled={disabled || pending}
      type="submit"
    />
  );
}
