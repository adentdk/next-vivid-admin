"use client";

import { forwardRef, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils/classnames";

import { Input, InputProps } from "./input";

export interface PasswordInputProps extends Omit<InputProps, "type"> {}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative w-full">
        <Input
          autoComplete="off"
          type={showPassword ? "text" : "password"}
          className={cn("relative", className)}
          ref={ref}
          {...props}
        />

        <button type="button" className="absolute right-3 top-0 bottom-0">
          {showPassword ? (
            <EyeOff
              className="w-5 h-5"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <Eye className="w-5 h-5" onClick={() => setShowPassword(true)} />
          )}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
