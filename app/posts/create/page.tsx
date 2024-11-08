import { Fragment } from "react";

import { ArrowLeft } from "lucide-react";

import { FullEditor } from "@/components/editor/full-editor";
import { ToolbarButtons } from "@/components/editor/partials/toolbar-buttons";
import { ButtonLink } from "@/components/ui/button-link";
import { Tooltip } from "@/components/ui/tooltip";

export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden">
      <FullEditor
        className="h-screen"
        toolbar={
          <Fragment>
            <ButtonLink href="#back">
              <ArrowLeft className="size-5" />
            </ButtonLink>
            <ToolbarButtons
              toolbars={[
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
