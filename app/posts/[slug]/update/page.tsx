import { Fragment } from "react";

import { ArrowLeft } from "lucide-react";

import { ToolbarButtons } from "@/components/editor/partials/toolbar-buttons";
import { PostEditor } from "@/components/editor/post-editor";
import { ButtonLink } from "@/components/ui/button-link";

export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden">
      <PostEditor
        className="h-screen rounded-none border-none"
        toolbar={
          <Fragment>
            <ButtonLink href="#back">
              <ArrowLeft className="size-5" />
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
      <div className="w-96">
        <h1>halo</h1>
      </div>
    </div>
  );
}
