import { Fragment } from "react";

import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/classnames";

import { Input } from "./input";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <div
      className={cn(
        "flex flex-col h-full items-center justify-start gap-2 pb-2",
        className,
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        className="h-8 data-[state=open]:bg-accent"
        disabled={!column.getCanSort()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>{title}</span>
        {column.getCanSort() ? (
          <Fragment>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Fragment>
        ) : null}
      </Button>

      {column.getCanFilter() ? (
        <Input
          type="search"
          placeholder={`Cari`}
          value={(column.getFilterValue() as string) || ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="text-xs h-8"
        />
      ) : null}
    </div>
  );
}
