"use client";

import { forwardRef } from "react";

import { ListOrdered } from "lucide-react";

import ToolbarButton, { ToolbarButtonProps } from "./_toolbar-button";
import { useToolbar } from "./_toolbar-provider";

const OrderedListToolbar = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();
    return (
      <ToolbarButton
        tooltip="Ordered list"
        aria-label="Insert ordered list"
        isActive={editor?.isActive("orderedList")}
        onClick={(e) => {
          editor?.chain().focus().toggleOrderedList().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
        ref={ref}
        {...props}
      >
        {children || <ListOrdered className="size-4" />}
      </ToolbarButton>
    );
  },
);

OrderedListToolbar.displayName = "OrderedListToolbar";

export { OrderedListToolbar };
