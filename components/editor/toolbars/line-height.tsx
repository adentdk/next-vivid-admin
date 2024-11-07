import { useMemo, useState } from "react";

import { ArrowDownFromLine } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/classnames";

import ToolbarButton from "./_toolbar-button";
import { useToolbar } from "./_toolbar-provider";

function percentageToDecimal(percentageString: any) {
  const percentage = Number.parseFloat(percentageString.replace("%", ""));
  const decimal = percentage / 100;
  return decimal;
}

function LineHeightToolbar() {
  const { editor } = useToolbar();
  const [value, setValue] = useState("default");

  function toggleLightheight(key: string) {
    if (key === "default") {
      editor.commands.unsetLineHeight();
    } else {
      editor.commands.setLineHeight(key);
    }
    setValue(key);
  }

  const LineHeights = useMemo(() => {
    const lineHeightOptions = editor.extensionManager.extensions.find(
      (e: any) => e.name === "lineHeight",
    )?.options ?? { lineHeights: [] };
    const a = lineHeightOptions.lineHeights;
    const b = a.map((item: any) => ({
      label: percentageToDecimal(item),
      value: item,
    }));

    b.unshift({
      label: "Default",
      value: "default",
    });
    return b;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={
          editor?.extensionManager.extensions.find(
            (e: any) => e.name === "lineHeight",
          ) === undefined
        }
        asChild
      >
        <ToolbarButton
          tooltip="Line Height"
          className={cn("h-8 w-max px-3 font-normal")}
        >
          <ArrowDownFromLine className="size-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="richtext-min-w-24">
        {LineHeights?.map((item: any, index: any) => {
          return (
            <DropdownMenuCheckboxItem
              key={`lineHeight-${index}`}
              checked={item.value === value}
              onClick={() => toggleLightheight(item.value)}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
LineHeightToolbar.displayName = "LineHeightToolbar";

export { LineHeightToolbar };
