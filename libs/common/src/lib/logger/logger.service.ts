import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import { LogMessageModel } from './log-record.model';

Injectable();
export class CustomLoggerService implements LoggerService {
  log(message: LogMessageModel, ...optionalParams: any[]) {
    console.log(message);
  }
  error(message: LogMessageModel, ...optionalParams: any[]) {
    console.log(message);
  }
  warn(message: LogMessageModel, ...optionalParams: any[]) {
    console.log(message);
  }
  debug?(message: LogMessageModel, ...optionalParams: any[]) {
    console.log(message);
  }
  verbose?(message: LogMessageModel, ...optionalParams: any[]) {
    console.log(message);
  }
  setLogLevels?(levels: LogLevel[]) {
    console.log(levels);
  }
}

// export class InnerLogger{
//     constructor(protected cus) {}
// }
