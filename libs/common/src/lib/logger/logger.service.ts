import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import {
  ClassModel,
  ContextModel,
  LogLevelEnum,
  LogLevelModel,
  LogMessageModel,
  LogRecordModel,
  getLogLevel,
} from './log-record.model';
import { v4 } from 'uuid';
import { Request } from 'express';
import * as jsonColorStringify from 'node-json-color-stringify';

function writeLog(logLevel: LogLevelModel, logRecord: LogRecordModel) {
  switch (logLevel) {
    case 'info':
      console.info(
        `${jsonColorStringify.colorStringify(logRecord, undefined, 2)}`
      );
      break;
    case 'error':
      console.error(
        `${jsonColorStringify.colorStringify(logRecord, undefined, 2)}`
      );
      break;
  }
}

Injectable();
export class CustomLoggerService implements LoggerService {
  #logLevel: LogLevelEnum = LogLevelEnum.info;
  #className = 'CustomLoggerService';

  #internalLogger = new InternalLogger('CustomLoggerService');

  constructor() {}

  log(message: LogMessageModel) {
    return this.#internalLogger.log('info', message);
  }
  error(message: LogMessageModel) {
    return this.#internalLogger.error('error', message);
  }
  warn(message: LogMessageModel) {
    return this.#internalLogger.warn('warn', message);
  }
  // debug?(message: LogMessageModel, ...optionalParams: any[]) {
  //   console.log(message);
  // }
  // verbose?(message: LogMessageModel, ...optionalParams: any[]) {
  //   console.log(message);
  // }
  setLogLevels?(levels: LogLevel[]) {
    console.log(levels, 'set log level');
  }
}

export class InternalLogger {
  #context: ContextModel;
  class: ClassModel;
  logLevel: number = getLogLevel(LogLevelEnum.info);

  constructor(className: string) {
    this.#context = {
      requestId: v4(),
    };
    this.setClass(className);
  }

  setLogLevels?(level: number) {
    this.logLevel = getLogLevel(level);
  }

  setContextFromRequest(httpRequest: Request) {
    const req = httpRequest;

    this.#context = {
      requestId: v4(),
      http: {
        origin: req.headers.origin,
        method: req.method,
        path: decodeURI(req.url),
        version: req.httpVersion,
      },
      user: {
        name: 'test',
      },
    };
  }

  setClass(className: string) {
    const classNameSplit = className
      .replace(/([a-zA-Z])(?=[A-Z])/g, '$1_')
      .split('_');
    this.class = {
      name: className,
      type: classNameSplit[classNameSplit.length - 1],
    };

    console.log(this.class);
  }

  log(logLevel: LogLevelModel, message: LogMessageModel): Promise<void> {
    return new Promise((resolve) => {
      resolve();
      this.#sendLogLevel(logLevel, message);
    });
  }

  error(logLevel: LogLevelModel, message: LogMessageModel): Promise<void> {
    return new Promise((resolve) => {
      resolve();
      this.#sendLogLevel(logLevel, message);
    });
  }

  warn(logLevel: LogLevelModel, message: LogMessageModel): Promise<void> {
    return new Promise((resolve) => {
      resolve();
      this.#sendLogLevel(logLevel, message);
    });
  }

  #sendLogLevel(logLevel: LogLevelModel, message: LogMessageModel) {
    const logModel: LogRecordModel = {
      class: this.class,
      context: this.#context,
      level: logLevel,
      message: message,
    };

    writeLog(logLevel, logModel);
  }
}
