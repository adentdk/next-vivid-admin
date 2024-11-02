import { useMemo } from "react";

import { cn } from "@/lib/utils/classnames";

interface DataTableColumnCellProps
  extends React.HTMLAttributes<HTMLDivElement> {
  textAlignment?: "left" | "center" | "right";
  align?: "left" | "center" | "right";
  verticalAlign?: "top" | "center" | "bottom";
}

export function DataTableColumnCell({
  className,
  children,
  align = "left",
  verticalAlign = "top",
  textAlignment = "left",
}: DataTableColumnCellProps) {
  const alignClassName = useMemo(() => {
    switch (align) {
      case "left":
        return "justify-start";
      case "center":
        return "justify-center";
      case "right":
        return "justify-end";
    }
  }, [align]);

  const verticalAlignClassName = useMemo(() => {
    switch (verticalAlign) {
      case "top":
        return "items-start";
      case "center":
        return "items-center";
      case "bottom":
        return "items-end";
    }
  }, [verticalAlign]);

  const textAlignmentClassName = useMemo(() => {
    switch (textAlignment) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
    }
  }, [textAlignment]);

  return (
    <div
      className={cn(
        "flex h-full items-start justify-start",
        alignClassName,
        verticalAlignClassName,
        textAlignmentClassName,
        className,
      )}
    >
      {children}
    </div>
  );
}
