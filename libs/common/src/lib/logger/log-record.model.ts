export enum LogLevelEnum {
  'info',
  'error',
  'warn',
}

export type LogLevelModel = keyof typeof LogLevelEnum;

export function getLogLevel(logLevel: LogLevelEnum): number {
  switch (logLevel) {
    case LogLevelEnum.info:
      return 1;
    case LogLevelEnum.error:
      return 2;
    case LogLevelEnum.warn:
      return 3;
    default:
      return 1;
  }
}

export interface LogMessageModel {
  line?: string;
  data?: any;
  error?: any;
  timeMs?: number;
}

export class ContextModel {
  requestId: string;
  http?: {
    method?: string;
    version?: string;
    origin?: string;
    agent?: string;
    path?: string;
  };
  user?: {
    name?: string;
  };
}

export interface ClassModel {
  name: string;
  type: string;
}

export class LogRecordModel {
  level: LogLevelModel;
  message: LogMessageModel;
  context: ContextModel;
  class: ClassModel;
}
