"use client";

import { Fragment, useEffect, useState } from "react";

import { Loader2 } from "lucide-react";

import {
  AlertDialogAction,
  type AlertDialogActionElement,
  AlertDialogCancel,
  type AlertDialogContentProps,
  type AlertDialogProps,
} from "@/components/ui/alert-dialog";

const ALERT_LIMIT = 1;
const ALERT_REMOVE_DELAY = 10_000;

type AlerterAlert = AlertDialogProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: AlertDialogActionElement;
  variant?: AlertDialogContentProps["variant"];
};

const actionTypes = {
  ADD_ALERT: "ADD_ALERT",
  UPDATE_ALERT: "UPDATE_ALERT",
  DISMISS_ALERT: "DISMISS_ALERT",
  REMOVE_ALERT: "REMOVE_ALERT",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_ALERT"];
      alert: AlerterAlert;
    }
  | {
      type: ActionType["UPDATE_ALERT"];
      alert: Partial<AlerterAlert>;
    }
  | {
      type: ActionType["DISMISS_ALERT"];
      alertId?: AlerterAlert["id"];
    }
  | {
      type: ActionType["REMOVE_ALERT"];
      alertId?: AlerterAlert["id"];
    };

interface State {
  alerts: AlerterAlert[];
}

const alertTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (alertId: string) => {
  if (alertTimeouts.has(alertId)) {
    return;
  }

  const timeout = setTimeout(() => {
    alertTimeouts.delete(alertId);
    dispatch({
      type: "REMOVE_ALERT",
      alertId: alertId,
    });
  }, ALERT_REMOVE_DELAY);

  alertTimeouts.set(alertId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_ALERT":
      return {
        ...state,
        alerts: [action.alert, ...state.alerts].slice(0, ALERT_LIMIT),
      };

    case "UPDATE_ALERT":
      return {
        ...state,
        alerts: state.alerts.map((t) =>
          t.id === action.alert.id ? { ...t, ...action.alert } : t,
        ),
      };

    case "DISMISS_ALERT": {
      const { alertId } = action;

      // ! Side effects ! - This could be extracted into a dismissAlert() action,
      // but I'll keep it here for simplicity
      if (alertId) {
        addToRemoveQueue(alertId);
      } else {
        state.alerts.forEach((alert) => {
          addToRemoveQueue(alert.id);
        });
      }

      return {
        ...state,
        alerts: state.alerts.map((t) =>
          t.id === alertId || alertId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case "REMOVE_ALERT":
      if (action.alertId === undefined) {
        return {
          ...state,
          alerts: [],
        };
      }
      return {
        ...state,
        alerts: state.alerts.filter((t) => t.id !== action.alertId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { alerts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

export type Alert = Omit<AlerterAlert, "id">;

function alert({ ...props }: Alert) {
  const id = genId();

  const update = (props: AlerterAlert) =>
    dispatch({
      type: "UPDATE_ALERT",
      alert: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_ALERT", alertId: id });

  dispatch({
    type: "ADD_ALERT",
    alert: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

alert.loading = ({
  title = "Wait a moment",
  description = "Loading...",
}: Partial<Alert> = {}) => {
  return alert({
    title,
    description: (
      <div className="flex justify-center items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin" />
        <div>{description}</div>
      </div>
    ),
  });
};

alert.default = ({
  title = "Success",
  onOk,
  onCancel,
  okText = "OK",
  cancelText = "Cancel",
  showOk = true,
  showCancel = false,
  ...rest
}: Partial<Alert> & {
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  showOk?: boolean;
  showCancel?: boolean;
} = {}) => {
  return alert({
    title,
    variant: "default",
    action: (
      <Fragment>
        {showOk ? (
          <AlertDialogAction onClick={onOk}>{okText}</AlertDialogAction>
        ) : null}
        {showCancel ? (
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
        ) : null}
      </Fragment>
    ),
    ...rest,
  });
};

function useAlert() {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    dismiss: (alertId?: string) => dispatch({ type: "DISMISS_ALERT", alertId }),
  };
}

export { alert, useAlert };
