"use client";

import { forwardRef } from "react";

import { Redo2 } from "lucide-react";

import ToolbarButton, { ToolbarButtonProps } from "./_toolbar-button";
import { useToolbar } from "./_toolbar-provider";

const RedoToolbar = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();

    return (
      <ToolbarButton
        tooltip="Redo"
        aria-label="Redo"
        onClick={(e) => {
          editor?.chain().focus().redo().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().redo().run()}
        ref={ref}
        {...props}
      >
        {children || <Redo2 className="size-4" />}
      </ToolbarButton>
    );
  },
);

RedoToolbar.displayName = "RedoToolbar";

export { RedoToolbar };
