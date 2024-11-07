"use client";

import { forwardRef } from "react";

import { Code2 } from "lucide-react";

import ToolbarButton, { ToolbarButtonProps } from "./_toolbar-button";
import { useToolbar } from "./_toolbar-provider";

const CodeToolbar = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();
    return (
      <ToolbarButton
        tooltip="Code"
        aria-label="Insert code"
        isActive={editor?.isActive("code")}
        onClick={(e) => {
          editor?.chain().focus().toggleCode().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().toggleCode().run()}
        ref={ref}
        {...props}
      >
        {children || <Code2 className="size-4" />}
      </ToolbarButton>
    );
  },
);

CodeToolbar.displayName = "CodeToolbar";

export { CodeToolbar };
