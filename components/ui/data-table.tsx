"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  InitialTableState,
  Table as TanstackTable,
  TableState,
  useReactTable,
} from "@tanstack/react-table";
import { useDebounceValue } from "usehooks-ts";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

interface DataTableProps<TData, TValue> {
  actions?: React.ReactNode;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount?: number;
  manual?: boolean;
  initialState?: InitialTableState;
  onStateChange?: (state: TableState) => void;
}

const DataTableComponent = <TData, TValue>(
  {
    actions,
    columns,
    data,
    rowCount,
    manual,
    initialState,
    onStateChange,
  }: DataTableProps<TData, TValue>,
  ref: React.Ref<TanstackTable<TData>>,
) => {
  const table = useReactTable({
    data,
    columns,
    rowCount,
    initialState,
    getCoreRowModel: getCoreRowModel(),
    //
    manualPagination: manual,
    manualExpanding: manual,
    manualFiltering: manual,
    manualSorting: manual,
    manualGrouping: manual,
    getPaginationRowModel: manual ? undefined : getPaginationRowModel(),
    getExpandedRowModel: manual ? undefined : getExpandedRowModel(),
    getFilteredRowModel: manual ? undefined : getFilteredRowModel(),
    getSortedRowModel: manual ? undefined : getSortedRowModel(),
    getGroupedRowModel: manual ? undefined : getGroupedRowModel(),
  });

  const [tableState, setTableState] = useState(table.initialState);

  const [debounceTableState] = useDebounceValue(tableState, 500);

  table.setOptions((prev) => ({
    ...prev,
    state: tableState,
    onStateChange: setTableState,
  }));

  useEffect(() => {
    if (typeof onStateChange === "function") {
      onStateChange(debounceTableState);
    }
  }, [onStateChange, debounceTableState]);

  useImperativeHandle(ref, () => table, [table]);

  return (
    <div className="space-y-4 pb-4">
      <div className="flex flex-wrap gap-4 justify-end items-center">
        {actions}
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  header.column.columnDef.size;
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
};

export const DataTable = forwardRef(DataTableComponent) as <TData, TValue>(
  props: DataTableProps<TData, TValue> & {
    ref?: React.Ref<TanstackTable<TData>>;
  },
) => JSX.Element;
