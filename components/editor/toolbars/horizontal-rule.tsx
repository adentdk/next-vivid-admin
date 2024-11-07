"use client";

import { forwardRef } from "react";

import { SeparatorHorizontal } from "lucide-react";

import ToolbarButton, { ToolbarButtonProps } from "./_toolbar-button";
import { useToolbar } from "./_toolbar-provider";

const HorizontalRuleToolbar = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();
    return (
      <ToolbarButton
        tooltip="Horizontal Rule"
        aria-label="Insert horizontal rule"
        onClick={(e) => {
          editor?.chain().focus().setHorizontalRule().run();
          onClick?.(e);
        }}
        ref={ref}
        {...props}
      >
        {children || <SeparatorHorizontal className="size-4" />}
      </ToolbarButton>
    );
  },
);

HorizontalRuleToolbar.displayName = "HorizontalRuleToolbar";

export { HorizontalRuleToolbar };
