"use client";

import { type Content, Editor, EditorContent } from "@tiptap/react";

import { EditorProvider } from "@/components/editor/partials/editor-provider";
import { cn } from "@/lib/utils/classnames";

import "./styles.css";

import { LinkBubbleMenu } from "./partials/link-bubble-menu";
import { useEditor, type UseEditorOptions } from "./use-editor";

export interface BaseEditorProps
  extends Omit<UseEditorOptions, "onUpdate" | "editable"> {
  onChange?: (value: Content) => void;
  toolbar?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

import { forwardRef, useImperativeHandle } from "react";

export const BaseEditor = forwardRef<Editor | null, BaseEditorProps>(
  (
    { toolbar, onChange, value, className, disabled = false, ...options },
    ref,
  ) => {
    const editor = useEditor({
      ...options,
      onUpdate: onChange,
      value,
      editable: !disabled,
    });

    useImperativeHandle(ref, () => editor as Editor, [editor]);

    if (!editor) {
      return null;
    }

    return (
      <EditorProvider editor={editor}>
        <div
          className={cn(
            "border flex flex-col w-full relative rounded-md overflow-hidden",
            className,
          )}
        >
          {typeof toolbar !== "undefined" ? (
            <div className="flex w-full items-center py-2 px-2 justify-between border-b sticky top-0 bg-background z-20">
              <div className="flex flex-1 items-center gap-2 flex-wrap">
                {toolbar}
              </div>
            </div>
          ) : null}
          <div
            onClick={() => {
              editor?.chain().focus().run();
            }}
            className={cn(
              "flex flex-1 max-h-full w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary",
              "overflow-y-auto scrollbar-thin bg-background",
            )}
          >
            <EditorContent
              className="outline-none border-none"
              editor={editor}
            />

            <LinkBubbleMenu />
          </div>
        </div>
      </EditorProvider>
    );
  },
);

BaseEditor.displayName = "BaseEditor";
