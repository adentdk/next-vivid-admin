import { Extension } from "@tiptap/core";

import {
  DEFAULT_LINE_HEIGHT,
  DEFAULT_LINE_HEIGHT_LIST,
} from "../constants/line-height";
import { createLineHeightCommand } from "../utils/line-height";

export interface LineHeightOptions {
  types: string[];
  lineHeights: string[];
  defaultHeight: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (lineHeight: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const LineHeight = Extension.create<LineHeightOptions>({
  name: "lineHeight",
  addOptions() {
    return {
      ...this.parent?.(),
      types: ["paragraph", "heading", "list_item", "todo_item"],
      lineHeights: DEFAULT_LINE_HEIGHT_LIST,
      defaultHeight: DEFAULT_LINE_HEIGHT,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => {
              return element.style.lineHeight || this.options.defaultHeight;
            },
            renderHTML: (attributes) => {
              if (
                attributes.lineHeight === this.options.defaultHeight ||
                !attributes.lineHeight
              ) {
                return {};
              }
              return { style: `line-height: ${attributes.lineHeight}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight: (lineHeight) => createLineHeightCommand(lineHeight),
      unsetLineHeight:
        () =>
        ({ commands }) => {
          return this.options.types.every((type) =>
            commands.resetAttributes(type, "lineHeight"),
          );
        },
    };
  },
});
