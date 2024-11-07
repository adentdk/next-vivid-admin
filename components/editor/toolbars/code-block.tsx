"use client";

import { forwardRef } from "react";

import { Code } from "lucide-react";

import ToolbarButton, { ToolbarButtonProps } from "./_toolbar-button";
import { useToolbar } from "./_toolbar-provider";

const CodeBlockToolbar = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();
    return (
      <ToolbarButton
        tooltip="Code Block"
        aria-label="Insert code block"
        isActive={editor?.isActive("codeBlock")}
        onClick={(e) => {
          editor?.chain().focus().toggleCodeBlock().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
        ref={ref}
        {...props}
      >
        {children || <Code className="size-4" />}
      </ToolbarButton>
    );
  },
);

CodeBlockToolbar.displayName = "CodeBlockToolbar";

export { CodeBlockToolbar };
