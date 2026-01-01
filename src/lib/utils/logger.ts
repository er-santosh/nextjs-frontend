/* eslint-disable no-console */
import { format } from "date-fns";

import colors from "@/lib/utils/colors";

export interface ILogger {
  log(...messages: unknown[]): void;
  debug(...messages: unknown[]): void;
  error(...messages: unknown[]): void;
  info: (...messages: unknown[]) => void;
}

export class Logger implements ILogger {
  constructor(private readonly context: string) {
    this.context = context;
  }

  private static logMessage(
    type: "log" | "debug" | "info" | "error",
    context: string,
    messages: unknown[],

    colorFn: (s: string) => string
  ): void {
    if (type === "log" || type === "info" || type === "error") {
      const now: string = format(new Date(), "PPpp");
      const prefix = colorFn(
        `[${type.toUpperCase()} - ${now} - ${colors.yellow(context)}]:`
      );

      console.log(prefix, ...messages);
    }
  }

  public log(...messages: unknown[]): void {
    Logger.logMessage("log", this.context, messages, colors.green);
  }

  public debug(...messages: unknown[]): void {
    Logger.logMessage("debug", this.context, messages, colors.orange);
  }

  public error(...messages: unknown[]): void {
    Logger.logMessage("error", this.context, messages, colors.red);
  }

  public info(...messages: unknown[]): void {
    Logger.logMessage("info", this.context, messages, colors.cyan);
  }

  public static log(context: string, ...messages: unknown[]): void {
    this.logMessage("log", context, messages, colors.green);
  }

  public static debug(context: string, ...messages: unknown[]): void {
    this.logMessage("debug", context, messages, colors.orange);
  }

  public static error(context: string, ...messages: unknown[]): void {
    this.logMessage("error", context, messages, colors.red);
  }

  public static info(context: string, ...messages: unknown[]): void {
    this.logMessage("info", context, messages, colors.cyan);
  }
}
