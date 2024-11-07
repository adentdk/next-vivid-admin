"use client";

import { forwardRef } from "react";

import { LucideImage } from "lucide-react";

import ToolbarButton, { ToolbarButtonProps } from "./_toolbar-button";
import { useToolbar } from "./_toolbar-provider";

const ImagePlaceholderToolbar = forwardRef<
  HTMLButtonElement,
  ToolbarButtonProps
>(({ className, onClick, children, ...props }, ref) => {
  const { editor } = useToolbar();
  return (
    <ToolbarButton
      tooltip="Image"
      aria-label="Insert image"
      isActive={editor?.isActive("image-placeholder")}
      onClick={(e) => {
        editor?.chain().focus().insertImagePlaceholder().run();
        onClick?.(e);
      }}
      ref={ref}
      {...props}
    >
      {children || <LucideImage className="size-4" />}
    </ToolbarButton>
  );
});

ImagePlaceholderToolbar.displayName = "ImagePlaceholderToolbar";

export { ImagePlaceholderToolbar };
