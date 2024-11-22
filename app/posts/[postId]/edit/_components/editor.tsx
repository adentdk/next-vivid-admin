"use client";

import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";

import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";

import { ToolbarButtons } from "@/components/editor/partials/toolbar-buttons";
import { PostEditor } from "@/components/editor/post-editor";
import { ButtonLink } from "@/components/ui/button-link";

import { EditPostSchemaType } from "../_schemas/edit-post.schema";

export function Editor() {
  const router = useRouter();
  const { setValue, getValues } = useFormContext<EditPostSchemaType>();

  const [content, setContent] = useState(() => getValues().content);

  const extractTitleFromContent = (html: string) =>
    html?.match(/<h1>(.*?)<\/h1>/)?.[1] || "";
  const sanitizeContent = (html: string) => html.replace(/<h1>.*?<\/h1>/g, "");

  const titleHtml = extractTitleFromContent(content);
  const [debouncedTitle] = useDebounceValue(titleHtml, 150);
  const [debouncedContent] = useDebounceValue(
    () => sanitizeContent(content),
    150,
  );

  const handleBackButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      router.back();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    console.log("setting title");
    setValue("title", debouncedTitle);

    const { seoTitle } = getValues();
    if (
      !seoTitle ||
      seoTitle.startsWith(debouncedTitle) ||
      debouncedTitle.startsWith(seoTitle)
    ) {
      setValue("seoTitle", debouncedTitle.slice(0, 60));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle]);

  useEffect(() => {
    console.log("setting content");
    setValue("content", debouncedContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedContent]);

  return (
    <PostEditor
      value={content}
      onChange={(newContent) => setContent(newContent?.toString() ?? "")}
      className="h-screen rounded-none border-none"
      output="html"
      toolbar={
        <Fragment>
          <ButtonLink href="/posts" onClick={handleBackButton} className="py-0">
            <ChevronLeft className="size-6" />
            Back to posts
          </ButtonLink>
          <ToolbarButtons
            toolbars={[
              "Separator",
              "UndoToolbar",
              "RedoToolbar",
              "Separator",
              "HeadingTooolbar",
              "BoldToolbar",
              "ItalicToolbar",
              "ColorAndHighlightToolbar",
              "Separator",
              "AlignmentToolbar",
              "CodeToolbar",
              "CodeBlockToolbar",
              "BulletListToolbar",
              "OrderedListToolbar",
              "Separator",
              "HardBreakToolbar",
              "HorizontalRuleToolbar",
              "LinkToolbar",
              "Separator",
              "ImagePlaceholderToolbar",
              "FlexGap",
              "SearchAndReplaceToolbar",
            ]}
          />
        </Fragment>
      }
    />
  );
}
