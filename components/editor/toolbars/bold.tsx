"use client";

import { forwardRef, Fragment } from "react";

import type { Extension } from "@tiptap/core";
import type { StarterKitOptions } from "@tiptap/starter-kit";
import { BoldIcon } from "lucide-react";

import ToolbarButton, { ToolbarButtonProps } from "./_toolbar-button";
import { useToolbar } from "./_toolbar-provider";

export type StarterKitExtensions = Extension<StarterKitOptions, any>;

const BoldToolbar = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();
    return (
      <ToolbarButton
        tooltip={
          <Fragment>
            <span>Bold</span>
            <span className="ml-1 text-xs text-gray-11">(cmd + b)</span>
          </Fragment>
        }
        aria-label="Set bold"
        isActive={editor?.isActive("bold")}
        onClick={(e) => {
          editor?.chain().focus().toggleBold().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
        ref={ref}
        {...props}
      >
        {children || <BoldIcon className="size-4" />}
      </ToolbarButton>
    );
  },
);

BoldToolbar.displayName = "BoldToolbar";

export { BoldToolbar };
