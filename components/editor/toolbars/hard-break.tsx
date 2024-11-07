"use client";

import { forwardRef } from "react";

import { WrapText } from "lucide-react";

import ToolbarButton, { ToolbarButtonProps } from "./_toolbar-button";
import { useToolbar } from "./_toolbar-provider";

const HardBreakToolbar = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();
    return (
      <ToolbarButton
        tooltip="Hard break"
        aria-label="Insert hard break"
        onClick={(e) => {
          editor?.chain().focus().setHardBreak().run();
          onClick?.(e);
        }}
        ref={ref}
        {...props}
      >
        {children || <WrapText className="size-4" />}
      </ToolbarButton>
    );
  },
);

HardBreakToolbar.displayName = "HardBreakToolbar";

export { HardBreakToolbar };
