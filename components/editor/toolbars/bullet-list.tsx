"use client";

import { forwardRef } from "react";

import { List } from "lucide-react";

import ToolbarButton, { ToolbarButtonProps } from "./_toolbar-button";
import { useToolbar } from "./_toolbar-provider";

const BulletListToolbar = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();

    return (
      <ToolbarButton
        tooltip="Bullet list"
        aria-label="Insert bullet list"
        isActive={editor?.isActive("bulletList")}
        onClick={(e) => {
          editor?.chain().focus().toggleBulletList().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().toggleBulletList().run()}
        ref={ref}
        {...props}
      >
        {children || <List className="size-4" />}
      </ToolbarButton>
    );
  },
);

BulletListToolbar.displayName = "BulletListToolbar";

export { BulletListToolbar };
