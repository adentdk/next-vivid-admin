"use client";

import { forwardRef } from "react";

import { ItalicIcon } from "lucide-react";

import ToolbarButton, { ToolbarButtonProps } from "./_toolbar-button";
import { useToolbar } from "./_toolbar-provider";

const ItalicToolbar = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();
    return (
      <ToolbarButton
        tooltip="Italic"
        aria-label="Set italic"
        isActive={editor?.isActive("italic")}
        onClick={(e) => {
          editor?.chain().focus().toggleItalic().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
        ref={ref}
        {...props}
      >
        {children || <ItalicIcon className="size-4" />}
      </ToolbarButton>
    );
  },
);

ItalicToolbar.displayName = "ItalicToolbar";

export { ItalicToolbar };
