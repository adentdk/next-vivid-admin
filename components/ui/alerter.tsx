"use client";

import { Fragment } from "react";

import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";

import { useAlert } from "../hooks/use-alert";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./alert-dialog";

export function Alerter() {
  const { alerts } = useAlert();

  return (
    <Fragment>
      {alerts.map(({ id, title, description, action, variant, ...props }) => (
        <AlertDialog key={id} {...props}>
          <AlertDialogContent variant={variant}>
            <AlertDialogHeader>
              {typeof title !== "undefined" ? (
                <AlertDialogTitle>{title}</AlertDialogTitle>
              ) : null}
              {typeof description !== "undefined" ? (
                <AlertDialogDescription>{description}</AlertDialogDescription>
              ) : null}
            </AlertDialogHeader>

            <AlertDialogFooter>{action}</AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ))}
    </Fragment>
  );
}
