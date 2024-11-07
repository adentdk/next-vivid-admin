"use client";

import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/classnames";

import "./styles.css";

import { LinkBubbleMenu } from "./bubbles/link-bubble-menu";
import Link from "./extensions/link";
import { ToolbarProvider } from "./toolbars/_toolbar-provider";
import { BlockquoteToolbar } from "./toolbars/blockquote";
import { BoldToolbar } from "./toolbars/bold";
import { BulletListToolbar } from "./toolbars/bullet-list";
import { CodeToolbar } from "./toolbars/code";
import { CodeBlockToolbar } from "./toolbars/code-block";
import { HardBreakToolbar } from "./toolbars/hard-break";
import { HorizontalRuleToolbar } from "./toolbars/horizontal-rule";
import { ItalicToolbar } from "./toolbars/italic";
import { LinkToolbar } from "./toolbars/link";
import { OrderedListToolbar } from "./toolbars/ordered-list";
import { RedoToolbar } from "./toolbars/redo";
import { StrikeThroughToolbar } from "./toolbars/strikethrough";
import { UndoToolbar } from "./toolbars/undo";

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    code: {
      HTMLAttributes: {
        class: "bg-accent rounded-md p-1",
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: "my-2",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "bg-primary text-primary-foreground p-2 text-sm rounded-md p-1",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
      HTMLAttributes: {
        class: "tiptap-heading",
      },
    },
  }),
  Link,
];

const content = `
<h2 class="tiptap-heading" style="text-align: center">Hello world 🌍</h2>
`;

export const StarterKitExample = () => {
  const editor = useEditor({
    extensions: extensions as Extension[],
    content,
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }
  return (
    <div className="border w-full relative rounded-md overflow-hidden pb-3">
      <div className="flex w-full items-center py-2 px-2 justify-between border-b  sticky top-0 left-0 bg-background z-20">
        <ToolbarProvider editor={editor}>
          <div className="flex items-center gap-2">
            <UndoToolbar />
            <RedoToolbar />
            <Separator orientation="vertical" className="h-7" />
            <BoldToolbar />
            <ItalicToolbar />
            <StrikeThroughToolbar />
            <BulletListToolbar />
            <OrderedListToolbar />
            <CodeToolbar />
            <CodeBlockToolbar />
            <HorizontalRuleToolbar />
            <BlockquoteToolbar />
            <HardBreakToolbar />
            <LinkToolbar />
          </div>
        </ToolbarProvider>
      </div>
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className={cn(
          "flex h-auto w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary",
          "",
        )}
      >
        <EditorContent className="outline-none border-none" editor={editor} />

        <LinkBubbleMenu editor={editor} />
      </div>
    </div>
  );
};
